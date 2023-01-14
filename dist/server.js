const http = require("node:http");
const fs = require("node:fs");
const crypto = require("node:crypto");
const { pipeline, Readable } = require("node:stream");
const zlib = require("node:zlib");

const db = require("./db.json");

const folders = new Map([
  ["Важное", "important"],
  ["Отправленные", "sent"],
  ["Черновики", "drafts"],
  ["Архив", "archive"],
  ["Спам", "spam"],
  ["Корзина", "trash"],
]);

const images = new Map();

const addImage = (dataURI) => {
  if (!/data:image\//.test(dataURI)) return null;

  const regExMatches = dataURI.match("data:(image/.*);base64,(.*)");

  const id = crypto.randomUUID();
  const type = regExMatches[1].slice(6);
  const content = Buffer.from(regExMatches[2], "base64");

  images.set(id, { type, content });

  return { id, type };
};

db.forEach((item) => {
  if (item.author?.avatar) {
    const img = addImage(item.author.avatar);
    if (img) item.author.avatar = "/images/" + img.id + "." + img.type;
  }

  if (item.doc?.img) {
    const img = addImage(item.doc.img);
    if (img) item.doc.img = "/images/" + img.id + "." + img.type;
  }
});

const grouped = db.reduce((acc, item) => {
  const folder = folders.get(item.folder) ?? "inbox";
  if (!acc[folder]) acc[folder] = [];
  item.id = crypto.randomUUID();
  acc[folder].push(item);
  return acc;
}, []);

const sendCompressed = (res, raw, acceptEncoding) => {
  res.setHeader("Vary", "Accept-Encoding");

  const onError = (err) => {
    if (err) {
      res.end();
      console.error("An error occurred:", err);
    }
  };

  if (/\bbr\b/.test(acceptEncoding)) {
    res.writeHead(200, { "Content-Encoding": "br" });
    pipeline(raw, zlib.createBrotliCompress(), res, onError);
  } else if (/\bdeflate\b/.test(acceptEncoding)) {
    res.writeHead(200, { "Content-Encoding": "deflate" });
    pipeline(raw, zlib.createDeflate(), res, onError);
  } else if (/\bgzip\b/.test(acceptEncoding)) {
    res.writeHead(200, { "Content-Encoding": "gzip" });
    pipeline(raw, zlib.createGzip(), res, onError);
  } else {
    res.writeHead(200, {});
    pipeline(raw, res, onError);
  }
};

const sendJson = (res, data, acceptEncoding) => {
  res.setHeader("Content-Type", '"application/json; charset=utf-8');
  const raw = Readable.from(JSON.stringify(data));
  sendCompressed(res, raw, acceptEncoding);
};

const sendFile = (res, name, acceptEncoding) => {
  const raw = fs.createReadStream(name);
  sendCompressed(res, raw, acceptEncoding);
};

const sendImage = (res, img) => {
  res.writeHead(200, { "Content-Type": "image/" + img.type });
  res.end(img.content);
};

const requestListener = function (req, res) {
  let acceptEncoding = req.headers["accept-encoding"];
  if (!acceptEncoding) {
    acceptEncoding = "";
  }

  if (req.url.startsWith("/images")) {
    const [, , id] = req.url.split("/");
    const name = String(id).slice(0, -4);
    const img = images.get(name);
    if (img) return sendImage(res, img);
  }

  if (req.url.startsWith("/api")) {
    const [, , folder, letter] = req.url.split("/");
    const items = grouped[folder] ?? [];

    if (letter) {
      const item = items.find((item) => item.id === letter) ?? null;
      return sendJson(res, item, acceptEncoding);
    }

    return sendJson(res, items, acceptEncoding);
  }

  const filename = "." + req.url;
  if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    return sendFile(res, filename, acceptEncoding);
  }

  return sendFile(res, "./index.html", acceptEncoding);
};

const server = http.createServer(requestListener);
server.listen(3000);

const start = performance.now();

const http = require("node:http");
const fs = require("node:fs");
const crypto = require("node:crypto");
const { pipeline, Readable } = require("node:stream");
const zlib = require("node:zlib");
const querystring = require("node:querystring");

const ITEMS_PER_PAGE = 20;

console.log("Loading data...");

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

// const fields = new Set()
db.forEach((item) => {
  // Object.keys(item).forEach(key => fields.add(key))
  if (item.author?.avatar) {
    const img = addImage(item.author.avatar);
    if (img) item.author.avatar = "/images/" + img.id + "." + img.type;
  }

  if (item.doc?.img) {
    const img = addImage(item.doc.img);
    if (img) item.doc.img = "/images/" + img.id + "." + img.type;
  }
});
// console.log(Array.from(fields))

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
  res.writeHead(200, {
    "Content-Type": "image/" + img.type,
    "Cache-Control": "max-age=31536000",
    Vary: "ETag, Content-Encoding",
  });
  res.end(img.content);
};

const getTextFromHtml = (text) =>
  text
    ?.split(">")
    ?.map((i) => i.split("<")[0])
    .filter((i) => !i.includes("=") && i.trim())
    .join("");

const requestListener = function (req, res) {
  let acceptEncoding = req.headers["accept-encoding"];
  if (!acceptEncoding) {
    acceptEncoding = "";
  }

  let [url, query] = req.url.split("?");
  query = query ? querystring.parse(query) : {};

  if (url.startsWith("/upload-image")) {
    const buffers = [];
    req.on("data", (chunk) => buffers.push(chunk));
    req.on("end", () => {
      const content = Buffer.concat(buffers).toString();
      const { id, type } = addImage(content);
      const url = `/images/${id}.${type}`;
      return sendJson(res, { url }, acceptEncoding);
    });

    return;
  }

  if (url.startsWith("/api/add-letter")) {
    const buffers = [];
    req.on("data", (chunk) => buffers.push(chunk));
    req.on("end", () => {
      const item = JSON.parse(Buffer.concat(buffers).toString());
      item.id = crypto.randomUUID();
      const folder = folders.get(item.folder) ?? "inbox";
      grouped[folder].unshift(item);
      return sendJson(res, { success: true }, acceptEncoding);
    });

    return;
  }

  if (url.startsWith("/images")) {
    const [, , id] = url.split("/");
    const name = String(id).replace(/(\..+)$/, "");
    const img = images.get(name);
    if (img) return sendImage(res, img);
  }

  if (url.startsWith("/api")) {
    const [, , folder, letter] = url.split("/");
    const items = grouped[folder] ?? [];

    if (letter) {
      const item = items.find((item) => item.id === letter) ?? null;
      return sendJson(res, item, acceptEncoding);
    }

    const filters = query.filters;
    let filteredItems = items;
    if (filters) {
      const filtersFunction = (() => {
        const fns = [];
        if (filters.includes("unread")) fns.push((letter) => !letter.read);
        if (filters.includes("bookmark")) fns.push((letter) => letter.bookmark);
        if (filters.includes("attaches")) fns.push((letter) => letter.doc);

        if (fns.length === 0) return () => true;
        return (letter) => fns.every((fn) => fn(letter));
      })();
      filteredItems = filteredItems.filter(filtersFunction);
    }
    let page = Number(query.page);
    page = Number.isNaN(page) ? 1 : Math.max(1, page);
    const offset = ITEMS_PER_PAGE * (page - 1);
    let responseItems = filteredItems.slice(offset, offset + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const pageInfo = {
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      page,
      perPage: ITEMS_PER_PAGE,
      totalItems: filteredItems.length,
      totalPages,
    };
    responseItems = responseItems.map((item) => {
      return {
        ...item,
        text: getTextFromHtml(item.text).slice(0, 150),
      };
    });
    const response = { items: responseItems, pageInfo };

    return sendJson(res, response, acceptEncoding);
  }

  const filename = "." + req.url;
  if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    return sendFile(res, filename, acceptEncoding);
  }

  return sendFile(res, "./index.html", acceptEncoding);
};

console.log("Creating server...");
const server = http.createServer(requestListener);

server.listen(3000, () => {
  console.log(
    "Server started in",
    (performance.now() - start) / 1000,
    "seconds"
  );
});

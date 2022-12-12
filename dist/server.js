const http = require("node:http");
const fs = require("node:fs");
const crypto = require("node:crypto");
const db = require("./db.json");

const folders = new Map([
  ["Важное", "important"],
  ["Отправленные", "sent"],
  ["Черновики", "drafts"],
  ["Архив", "archive"],
  ["Спам", "spam"],
  ["Корзина", "trash"],
]);

const grouped = db.reduce((acc, item) => {
  const folder = folders.get(item.folder) ?? "inbox";
  if (!acc[folder]) acc[folder] = [];
  item.id = crypto.randomUUID();
  acc[folder].push(item);
  return acc;
}, []);

const sendJson = (res, data) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(data));
};

const sendFile = (res, name) => {
  res.writeHead(200);
  let content = "";
  try {
    content = fs.readFileSync(name);
  } catch (e) {
    console.error(e.message);
  }
  res.end(content);
};

const requestListener = function (req, res) {
  if (req.url.startsWith("/api")) {
    const [, , folder, letter] = req.url.split("/");
    const items = grouped[folder] ?? [];

    if (letter) {
      const item = items.find((item) => item.id === letter) ?? null;
      return sendJson(res, item);
    }

    return sendJson(res, items);
  }

  const filename = "." + req.url;
  if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    return sendFile(res, filename);
  }

  return sendFile(res, "./index.html");
};

const server = http.createServer(requestListener);
server.listen(3000);

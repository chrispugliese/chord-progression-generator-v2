import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

const requestedPort = process.env.PORT ? Number(process.env.PORT) : 0;

if (Number.isNaN(requestedPort) || requestedPort < 0 || requestedPort > 65535) {
  console.error("PORT must be a valid number between 0 and 65535.");
  process.exit(1);
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://localhost");
  const pathname = decodeURIComponent(requestUrl.pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const safePath = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(rootDir, safePath);

  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const resolvedPath = stats.isDirectory() ? path.join(filePath, "index.html") : filePath;
    fs.readFile(resolvedPath, (readError, fileBuffer) => {
      if (readError) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      const extension = path.extname(resolvedPath).toLowerCase();
      response.writeHead(200, {
        "Content-Type": mimeTypes[extension] ?? "application/octet-stream",
        "Cache-Control": "no-cache"
      });
      response.end(fileBuffer);
    });
  });
});

server.listen(requestedPort, "127.0.0.1", () => {
  const address = server.address();

  if (!address || typeof address === "string") {
    console.error("Could not determine the local server address.");
    process.exit(1);
  }

  console.log(`Chord Progression Generator running at http://127.0.0.1:${address.port}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${requestedPort} is already in use.`);
  } else {
    console.error(error.message);
  }
  process.exit(1);
});

// Empaqueta webapp/ en dist/wz-maestro.zip
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const dist = path.join(__dirname, "dist");
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist, { recursive: true });
}

const out = fs.createWriteStream(path.join(dist, "wz-maestro.zip"));
const zip = archiver("zip", { zlib: { level: 9 } });
out.on("close", () => console.log("✓ wz-maestro.zip listo:", zip.pointer(), "bytes"));
zip.on("error", (e) => { throw e; });
zip.pipe(out);
zip.directory(path.join(__dirname, "webapp"), false);
zip.finalize();
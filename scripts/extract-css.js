const fs = require("fs");

const file = "index.html";
let html = fs.readFileSync(file, "utf8");

const match = html.match(/<style>([\s\S]*?)<\/style>/i);

if (!match) {
    console.log("Tidak ada CSS inline.");
    process.exit(0);
}

fs.writeFileSync("assets/css/main.css", match[1].trim());

html = html.replace(
    match[0],
    '<link rel="stylesheet" href="assets/css/main.css">'
);

fs.writeFileSync(file, html);

console.log("✓ CSS berhasil dipindahkan.");

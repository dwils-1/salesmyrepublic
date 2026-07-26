const fs = require("fs");

const file = "index.html";
let html = fs.readFileSync(file, "utf8");

// Ambil hanya <script> inline biasa (bukan JSON-LD dan bukan yang punya src)
const regex = /<script(?![^>]*src)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/gi;

let js = "";
let count = 0;

html = html.replace(regex, (full, code) => {
    js += "\n\n" + code.trim();
    count++;
    return "";
});

if (count === 0) {
    console.log("Tidak ada JS inline.");
    process.exit(0);
}

fs.writeFileSync("assets/js/app.js", js.trim());

const bodyClose = html.lastIndexOf("</body>");

html =
    html.slice(0, bodyClose) +
    '\n<script src="assets/js/app.js"></script>\n' +
    html.slice(bodyClose);

fs.writeFileSync(file, html);

console.log(`✓ ${count} script inline dipindahkan.`);

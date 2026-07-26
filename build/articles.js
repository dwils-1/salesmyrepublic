const fs=require("fs");
const ejs=require("ejs");

const articles=JSON.parse(
fs.readFileSync("data/articles.json","utf8")
);

const out="pages/artikel";

fs.mkdirSync(out,{recursive:true});

const indexTemplate=fs.readFileSync(
"templates/articles.ejs",
"utf8"
);

fs.writeFileSync(
`${out}/index.html`,
ejs.render(indexTemplate,{articles})
);

articles.forEach(a=>{

const html=`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${a.title}</title>
<meta name="description" content="${a.title}">
</head>

<body style="font-family:Arial;max-width:900px;margin:auto;padding:20px">

<a href="index.html">← Semua Artikel</a>

<h1>${a.title}</h1>

${a.content}

<hr>

<small>${a.created}</small>

</body>
</html>`;

fs.writeFileSync(
`${out}/${a.slug}.html`,
html
);

console.log("✓",a.slug);

});

console.log("✓ index artikel");
console.log("SELESAI");

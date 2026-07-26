const fs=require("fs");

const articles=JSON.parse(
fs.readFileSync("data/articles.json","utf8")
);

const dir="pages/artikel";

if(!fs.existsSync(dir))
fs.mkdirSync(dir,{recursive:true});

articles.forEach(a=>{

const html=`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>${a.title}</title>
<meta name="description" content="${a.title}">
</head>

<body>

<h1>${a.title}</h1>

${a.content}

<hr>

<p>Dibuat : ${a.created}</p>

</body>
</html>`;

fs.writeFileSync(
`${dir}/${a.slug}.html`,
html
);

console.log("✓",a.slug);

});

console.log("SELESAI");

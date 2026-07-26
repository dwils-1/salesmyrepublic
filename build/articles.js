const fs=require("fs");

const articles=JSON.parse(fs.readFileSync("data/articles.json","utf8"));

const out="pages/artikel";

fs.mkdirSync(out,{recursive:true});

let index=`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Daftar Artikel</title>
</head>
<body>

<h1>Daftar Artikel</h1>

<ul>
`;

articles.forEach(a=>{

const html=`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${a.title}</title>
</head>
<body>

<a href="../index.html">← Semua Artikel</a>

<h1>${a.title}</h1>

${a.content}

<hr>

<small>${a.created}</small>

</body>
</html>`;

fs.writeFileSync(`${out}/${a.slug}.html`,html);

index+=`<li><a href="${a.slug}.html">${a.title}</a></li>\n`;

console.log("✓",a.slug);

});

index+=`
</ul>

</body>
</html>
`;

fs.writeFileSync(`${out}/index.html`,index);

console.log("✓ index artikel");

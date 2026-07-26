const fs=require("fs");

const articles=JSON.parse(fs.readFileSync("data/articles.json","utf8"));

if(!fs.existsSync("pages/artikel"))
fs.mkdirSync("pages/artikel",{recursive:true});

let index=`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>Artikel SalesMyRepublic</title>
<style>
body{font-family:Arial;max-width:900px;margin:auto;padding:20px}
.card{border:1px solid #ddd;border-radius:10px;padding:15px;margin:15px 0}
a{text-decoration:none;font-size:24px;font-weight:bold}
</style>
</head>
<body>
<h1>Artikel SalesMyRepublic</h1>
`;

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
</body>
</html>`;

fs.writeFileSync(`pages/artikel/${a.slug}.html`,html);

index+=`
<div class="card">
<a href="${a.slug}.html">${a.title}</a>
<p>${a.created}</p>
</div>
`;

console.log("✓",a.slug);

});

index+="</body></html>";

fs.writeFileSync("pages/artikel/index.html",index);

console.log("✓ index artikel");

const fs=require("fs");

const promo=JSON.parse(fs.readFileSync("data/promo.json","utf8"));

fs.mkdirSync("pages/promo",{recursive:true});

let index=`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>Promo SalesMyRepublic</title>
<style>
body{font-family:Arial;max-width:900px;margin:auto;padding:20px}
.card{border:1px solid #ddd;border-radius:10px;padding:15px;margin:15px 0}
a{text-decoration:none;font-size:22px;font-weight:bold}
</style>
</head>
<body>
<h1>Promo SalesMyRepublic</h1>
`;

promo.forEach(p=>{

const html=`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>${p.title}</title>
<meta name="description" content="${p.description||p.title}">
</head>
<body>

<h1>${p.title}</h1>

${p.content||""}

</body>
</html>`;

fs.writeFileSync(`pages/promo/${p.slug}.html`,html);

index+=`
<div class="card">
<a href="${p.slug}.html">${p.title}</a>
<p>${p.created||""}</p>
</div>
`;

console.log("✓",p.slug);

});

index+="</body></html>";

fs.writeFileSync("pages/promo/index.html",index);

console.log("✓ index promo");

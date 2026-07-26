const fs=require("fs");

const faq=JSON.parse(fs.readFileSync("data/faq.json","utf8"));

fs.mkdirSync("pages/faq",{recursive:true});

let index=`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>FAQ SalesMyRepublic</title>
<style>
body{font-family:Arial;max-width:900px;margin:auto;padding:20px}
.card{border:1px solid #ddd;padding:15px;border-radius:10px;margin:15px 0}
</style>
</head>
<body>
<h1>FAQ SalesMyRepublic</h1>
`;

faq.forEach(f=>{

const html=`<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<title>${f.question}</title>
<meta name="description" content="${f.answer.substring(0,150)}">
<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"FAQPage",
"mainEntity":[{
"@type":"Question",
"name":${JSON.stringify(f.question)},
"acceptedAnswer":{
"@type":"Answer",
"text":${JSON.stringify(f.answer)}
}
}]
}
</script>
</head>
<body>
<h1>${f.question}</h1>
<p>${f.answer}</p>
</body>
</html>`;

fs.writeFileSync(`pages/faq/${f.slug}.html`,html);

index+=`
<div class="card">
<h3><a href="${f.slug}.html">${f.question}</a></h3>
</div>
`;

console.log("✓",f.slug);

});

index+="</body></html>";

fs.writeFileSync("pages/faq/index.html",index);

console.log("✓ index faq");

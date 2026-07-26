const fs=require("fs");

const files=[
["artikel","data/articles.json"],
["faq","data/faq.json"],
["promo","data/promo.json"]
];

let out=[];

files.forEach(([type,file])=>{

if(!fs.existsSync(file)) return;

let data=JSON.parse(fs.readFileSync(file,"utf8"));

data.forEach(x=>{

out.push({
type,
title:x.title||x.question||"",
slug:x.slug||"",
description:x.description||x.answer||"",
content:x.content||""
});

});

});

fs.writeFileSync(
"search.json",
JSON.stringify(out,null,2)
);

console.log("✓ search.json");

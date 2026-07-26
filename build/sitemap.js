const fs=require("fs");

const cities=JSON.parse(fs.readFileSync("data/cities.json","utf8"));
const articles=JSON.parse(fs.readFileSync("data/articles.json","utf8"));

const domain="https://salesmyrepublic.github.io";

let xml=`<?xml version="1.0" encoding="UTF-8"?>\n`;
xml+=`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

cities.forEach(c=>{
xml+=`<url><loc>${domain}/${c.slug}/</loc></url>\n`;
});

articles.forEach(a=>{
xml+=`<url><loc>${domain}/pages/artikel/${a.slug}.html</loc></url>\n`;
});

xml+="</urlset>";

fs.writeFileSync("sitemap.xml",xml);

console.log("✓ sitemap.xml");

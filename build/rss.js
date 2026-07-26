const fs=require("fs");

const domain="https://salesmyrepublic.my.id";

const articles=JSON.parse(
fs.readFileSync("data/articles.json","utf8")
);

let rss=`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>

<title>SalesMyRepublic</title>

<link>${domain}</link>

<description>Artikel SalesMyRepublic</description>
`;

articles.forEach(a=>{

rss+=`
<item>

<title><![CDATA[${a.title}]]></title>

<link>${domain}/pages/artikel/${a.slug}.html</link>

<guid>${domain}/pages/artikel/${a.slug}.html</guid>

<pubDate>${new Date(a.created).toUTCString()}</pubDate>

<description><![CDATA[${a.content||""}]]></description>

</item>
`;

});

rss+=`
</channel>
</rss>
`;

fs.writeFileSync("rss.xml",rss);

console.log("✓ rss.xml");

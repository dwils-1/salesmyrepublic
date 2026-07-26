const fs=require("fs");
const path=require("path");

const dirs=fs.readdirSync(".").filter(d=>{
    return fs.existsSync(path.join(d,"index.html"));
});

const data=[];

for(const dir of dirs){

    const html=fs.readFileSync(path.join(dir,"index.html"),"utf8");

    const title=(html.match(/<title>(.*?)<\/title>/i)||[])[1]||"";

    const desc=(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)||[])[1]||"";

    data.push({
        slug:dir,
        name:dir.charAt(0).toUpperCase()+dir.slice(1),
        title:title,
        description:desc
    });

}

fs.writeFileSync(
"data/cities.json",
JSON.stringify(data,null,2)
);

console.log(data.length+" kota berhasil diextract");

const fs=require("fs");
const path=require("path");
const ejs=require("ejs");

const cities=JSON.parse(fs.readFileSync("data/cities.json","utf8"));

const template="templates/index.ejs";

(async()=>{

for(const city of cities){

const html=await ejs.renderFile(template,{
city,
year:new Date().getFullYear()
});

const out=path.join(city.slug);

fs.mkdirSync(out,{recursive:true});

fs.writeFileSync(
path.join(out,"index.html"),
html
);

console.log("✓",city.slug);

}

console.log("\nSELESAI");

})();

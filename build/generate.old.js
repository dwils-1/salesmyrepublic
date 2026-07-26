const fs = require("fs");
const path = require("path");

const template = fs.readFileSync("templates/home.html","utf8");

const cities = fs.readdirSync(".")
.filter(f=>{
    return fs.existsSync(path.join(f,"index.html"));
});

console.log(cities.length+" kota ditemukan");

for(const city of cities){

    let html = template;

    html = html.replace(/INDONESIA/g, city);

    fs.writeFileSync(
        path.join(city,"index.html"),
        html
    );

    console.log("Generate :",city);
}
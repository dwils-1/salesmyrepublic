const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const cities = JSON.parse(
    fs.readFileSync("data/cities.json","utf8")
);

const template = fs.readFileSync(
    "templates/home.ejs",
    "utf8"
);

cities.forEach(city=>{

    let html = template;

    html = html.replace(/Bandung/g,city.name);
    html = html.replace(/bandung/g,city.slug);

    html = html.replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${city.title}</title>`
    );

    html = html.replace(
        /<meta name="description" content="[^"]*">/,
        `<meta name="description" content="${city.description}">`
    );

    const dir = city.slug;

    if(!fs.existsSync(dir))
        fs.mkdirSync(dir);

    fs.writeFileSync(
        path.join(dir,"index.html"),
        html
    );

    console.log("✓",city.name);
});

const fs=require("fs");

const cities=JSON.parse(fs.readFileSync("data/cities.json","utf8"));

for(const c of cities){

    c.province="";
    c.latitude="";
    c.longitude="";
    c.whatsapp="6281908999242";
    c.hero="assets/img/myrepublic-50Mbps.png";
    c.coverage=true;
    c.faq=[];
    c.packages=[];
    c.schema={};

}

fs.writeFileSync(
"data/cities.json",
JSON.stringify(cities,null,2)
);

console.log("Upgrade selesai:",cities.length);

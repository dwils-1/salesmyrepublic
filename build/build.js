const {execSync}=require("child_process");

const jobs=[
"node build/generate.js",
"node build/articles.js",
"node build/faq.js",
"node build/promo.js",
"node build/sitemap.js"
];

jobs.forEach(j=>{
console.log("\n======================");
console.log(j);
console.log("======================");
execSync(j,{stdio:"inherit"});
});

console.log("\nBUILD SELESAI");

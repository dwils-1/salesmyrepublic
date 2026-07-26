const {execSync}=require("child_process");

[
"node build/generate.js",
"node build/articles.js",
"node build/faq.js",
"node build/promo.js",
"node build/sitemap.js"
].forEach(c=>{
console.log(">>",c);
execSync(c,{stdio:"inherit"});
});

(async()=>{

const artikel=new Crud("data/articles.json");
const faq=new Crud("data/faq.json");
const promo=new Crud("data/promo.json");

document.getElementById("artikel").innerText=(await artikel.load()).length;
document.getElementById("faq").innerText=(await faq.load()).length;
document.getElementById("promo").innerText=(await promo.load()).length;

})();

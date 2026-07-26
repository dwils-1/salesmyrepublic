async function load(){

let a=await fetch("../data/articles.json").then(r=>r.json());
let f=await fetch("../data/faq.json").then(r=>r.json());
let p=await fetch("../data/promo.json").then(r=>r.json());

artikel.textContent=a.length;
faq.textContent=f.length;
promo.textContent=p.length;

}

load();

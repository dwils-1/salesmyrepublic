const routes={
dashboard:"pages/dashboard.html",
articles:"pages/articles.html",
faq:"pages/faq.html",
promo:"pages/promo.html",
media:"pages/media.html",
seo:"pages/seo.html",
analytics:"pages/analytics.html",
settings:"pages/settings.html"
};

function openPage(name){
document.getElementById("frame").src=routes[name];
localStorage.page=name;
}

window.onload=()=>{
openPage(localStorage.page||"dashboard");
}

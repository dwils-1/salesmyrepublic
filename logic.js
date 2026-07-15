document.addEventListener("DOMContentLoaded", function() {
    if (typeof SITE_CONTENT !== "undefined") {
        const pathArray = window.location.pathname.split("/");
        const folder = pathArray[pathArray.length - 2] || "Indonesia";
        const kota = folder.charAt(0).toUpperCase() + folder.slice(1);
        const replaceKota = (text) => text.replace(/{kota}/g, kota);

        if (document.getElementById("hero-title")) document.getElementById("hero-title").textContent = replaceKota(SITE_CONTENT.heroTitle);
        if (document.getElementById("hero-subtitle")) document.getElementById("hero-subtitle").textContent = replaceKota(SITE_CONTENT.heroSubtitle);
        if (document.getElementById("article-title")) document.getElementById("article-title").textContent = replaceKota(SITE_CONTENT.articleTitle);
        if (document.getElementById("article-desc")) document.getElementById("article-desc").textContent = replaceKota(SITE_CONTENT.articleDesc);
    }
});

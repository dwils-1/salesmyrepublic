document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        if (typeof SITE_CONTENT !== 'undefined') {
            const heroTitle = document.getElementById('hero-title');
            const heroSub = document.getElementById('hero-subtitle');
            const artTitle = document.getElementById('article-title');

            if (heroTitle) heroTitle.innerText = SITE_CONTENT.heroTitle;
            if (heroSub) heroSub.innerText = SITE_CONTENT.heroSubtitle;
            if (artTitle) artTitle.innerText = SITE_CONTENT.articleTitle;
        }
    }, 500);
});


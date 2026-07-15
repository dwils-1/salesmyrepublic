document.addEventListener('DOMContentLoaded', () => {
    // Ambil nama kota dari folder
    const pathArray = window.location.pathname.split('/');
    let namaKota = pathArray[pathArray.length - 2]; 
    
    // Format nama kota (Kapitalisasi huruf pertama)
    if(namaKota) {
        namaKota = namaKota.charAt(0).toUpperCase() + namaKota.slice(1);
    }

    // Fungsi injeksi teks
    const inject = (id, text, kota) => {
        const el = document.getElementById(id);
        if(el) el.innerText = text.replace("[kota]", kota);
    };

    // Pastikan variabel webContent sudah tersedia dari konten.js
    if (typeof webContent !== 'undefined') {
        inject('hero-title', webContent.hero.title, namaKota);
        inject('hero-subtitle', webContent.hero.subtitle, namaKota);
        inject('article-title', webContent.article.title, namaKota);
        inject('article-desc', webContent.article.desc, namaKota);
    }
});

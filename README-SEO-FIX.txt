SALES MYREPUBLIC SEO FIX
==========================

File ini disiapkan untuk repository GitHub Pages:
https://github.com/dwils-1/salesmyrepublic

Upload ke ROOT repository:
- robots.txt
- sitemap.xml
- 404.html

Catatan penting:
1. robots.txt dan sitemap.xml pada repository saat ini sudah menggunakan format
   URL dengan trailing slash (/kota/). File di paket ini mempertahankan format itu.
2. 404.html aman untuk GitHub Pages dan tidak melakukan redirect JavaScript.
3. Paket ini TIDAK menggunakan .htaccess karena GitHub Pages tidak menjalankan
   konfigurasi Apache .htaccess.
4. Redirect error pada URL seperti /surabaya (tanpa slash) tidak dapat dipaksa
   menjadi 301 dari HTML. GitHub Pages menangani URL direktori secara otomatis.
5. Untuk mengurangi URL redirect, semua link internal kota sebaiknya ditulis
   /kota/ dan bukan /kota.

Setelah upload:
- tunggu GitHub Pages selesai build,
- buka URL final /kota/,
- di Search Console gunakan Inspeksi URL pada URL final,
- kemudian klik Validasi Perbaikan.

Jangan menghapus CNAME.

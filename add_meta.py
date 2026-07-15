import os

for folder in os.listdir('.'):
    if os.path.isdir(folder) and folder not in ['.git', 'images', '__pycache__']:
        file_path = os.path.join(folder, 'index.html')
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Membuat meta deskripsi yang unik
            nama_kota = folder.capitalize()
            meta_tag = f'<meta name="description" content="Pasang internet fiber optik MyRepublic murah dan cepat di {nama_kota}. Koneksi stabil, harga terbaik, registrasi mudah. Cek harga paket MyRepublic di {nama_kota} sekarang.">'
            
            # Jika sudah ada meta description, kita ganti. Jika belum, kita tambahkan di bawah <head>
            if '<meta name="description"' in content:
                import re
                new_content = re.sub(r'<meta name="description" content=".*">', meta_tag, content)
            else:
                new_content = content.replace('<head>', f'<head>\n    {meta_tag}')
            
            with open(file_path, 'w') as f:
                f.write(new_content)
            print(f"Updated meta description for: {nama_kota}")

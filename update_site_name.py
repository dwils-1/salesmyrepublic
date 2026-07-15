import os

# Daftar folder yang akan diproses
for folder in os.listdir('.'):
    # Memastikan ini adalah folder kota dan bukan folder sistem
    if os.path.isdir(folder) and folder not in ['.git', '__pycache__']:
        file_path = os.path.join(folder, 'index.html')
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Membuat nama kota yang rapi
            kota = folder.capitalize()
            new_site_name = f"Sales MyRepublic {kota}"
            
            # Menambahkan/Update JSON-LD WebSite Schema
            schema = f'''
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{new_site_name}",
  "url": "https://salesmyrepublic.my.id/{folder.lower()}/"
}}
</script>'''
            
            # Menghapus schema lama jika ada agar tidak duplikat, lalu menambahkan yang baru
            if '<script type="application/ld+json">' in content:
                # Logika sederhana untuk replace (opsional)
                pass 
            
            # Menyisipkan di head
            if '</head>' in content:
                content = content.replace('</head>', f'{schema}\n</head>')
                
                with open(file_path, 'w') as f:
                    f.write(content)
                print(f"Updated Site Name Schema for: {kota}")

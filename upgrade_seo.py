import os

# Daftar folder yang akan diproses
for folder in os.listdir('.'):
    if os.path.isdir(folder) and folder not in ['.git', 'images', '__pycache__', 'node_modules']:
        file_path = os.path.join(folder, 'index.html')
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
            
            # 1. Definisi URL Canonical
            kota = folder.lower()
            canonical_url = f"https://salesmyrepublic.my.id/{kota}/"
            canonical_tag = f'<link rel="canonical" href="{canonical_url}">'
            
            # 2. Definisi Schema Markup (LocalBusiness)
            schema_markup = f'''
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sales MyRepublic {folder.capitalize()}",
  "address": {{
    "@type": "PostalAddress",
    "addressLocality": "{folder.capitalize()}",
    "addressCountry": "ID"
  }},
  "url": "{canonical_url}"
}}
</script>'''

            # Sisipkan ke dalam konten (sebelum penutup </head>)
            if '<link rel="canonical"' not in content:
                content = content.replace('</head>', f'    {canonical_tag}\n</head>')
            
            if 'application/ld+json' not in content:
                content = content.replace('</head>', f'{schema_markup}\n</head>')
            
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Updated SEO tags for: {folder}")

import os

# Menghapus baris token lama dan menggantinya dengan pemanggilan config.js
for folder in os.listdir('.'):
    if os.path.isdir(folder) and folder not in ['.git', 'images', '__pycache__']:
        file_path = os.path.join(folder, 'index.html')
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Mencari dan mengganti baris token (menyesuaikan dengan pola kode Anda)
            import re
            # Regex untuk mencari variabel token di dalam tag <script>
            new_content = re.sub(r"const BOT_TOKEN = '.*';", "const BOT_TOKEN = CONFIG.BOT_TOKEN;", content)
            new_content = re.sub(r"const CHAT_ID = '.*';", "const CHAT_ID = CONFIG.CHAT_ID;", new_content)
            new_content = re.sub(r"const TOPIC_SALES = '.*';", "const TOPIC_SALES = CONFIG.TOPIC_SALES;", new_content)
            new_content = re.sub(r"const TOKEN_COMPLAINT = \".*\";", "const TOKEN_COMPLAINT = CONFIG.TOKEN_COMPLAINT;", new_content)
            new_content = re.sub(r"const TOPIC_COMPLAINT = '.*';", "const TOPIC_COMPLAINT = CONFIG.TOPIC_COMPLAINT;", new_content)
            
            # Menambahkan link ke config.js di bagian head atau sebelum script utama
            if '<script src="../config.js"></script>' not in new_content:
                new_content = new_content.replace('<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>', 
                                                  '<script src="../config.js"></script>\n    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>')
            
            with open(file_path, 'w') as f:
                f.write(new_content)
            print(f"Update config: {folder}")

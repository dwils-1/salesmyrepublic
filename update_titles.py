import os
import re

for folder in os.listdir('.'):
    # Abaikan folder sistem
    if os.path.isdir(folder) and folder not in ['.git', 'images', '__pycache__', 'node_modules']:
        file_path = os.path.join(folder, 'index.html')
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Format judul yang Anda inginkan
            kota = folder.capitalize()
            new_title = f"<title>Sales MyRepublic {kota} - Internet Fiber Optik Tanpa Batas</title>"
            
            # Ganti tag <title> lama dengan yang baru
            new_content = re.sub(r'<title>.*?</title>', new_title, content)
            
            with open(file_path, 'w') as f:
                f.write(new_content)
            print(f"Updated title: {kota}")

import os

# Tanda awal dan akhir blok skrip harga yang lama di index.html
# Pastikan ini cocok dengan struktur kode Anda
START_TAG = '<script>const dataHargaStatis = ['
END_TAG = ']; renderHarga(dataHargaStatis);</script>'

for folder in os.listdir('.'):
    # Hanya proses folder kota (abaikan folder sistem)
    if os.path.isdir(folder) and folder not in ['.git', 'images', '__pycache__']:
        file_path = os.path.join(folder, 'index.html')

        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                content = f.read()

            # Cek apakah file memiliki blok harga lama
            if START_TAG in content:
                # Ambil bagian sebelum blok harga
                parts = content.split(START_TAG)
                before_script = parts[0]
                after_script = parts[1].split(END_TAG)[1]

                # Gabungkan dengan pemanggilan harga.js baru
                new_content = before_script + '<script src="../harga.js"></script>' + after_script

                with open(file_path, 'w') as f:
                    f.write(new_content)
                print(f"Berhasil update: {folder}/index.html")

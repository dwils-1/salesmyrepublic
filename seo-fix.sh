#!/data/data/com.termux/files/usr/bin/bash

BASE_URL="https://salesmyrepublic.my.id"
PHONE="+6281234567890"

find . -mindepth 2 -maxdepth 2 -name index.html | while read file
do
    folder=$(basename "$(dirname "$file")")

    case "$folder" in
        bandaaceh) kota="Banda Aceh" ;;
        deliserdang) kota="Deli Serdang" ;;
        jakartabarat) kota="Jakarta Barat" ;;
        metroyogyakarta) kota="Metro Yogyakarta" ;;
        palangkaraya) kota="Palangka Raya" ;;
        pematangsiantar) kota="Pematang Siantar" ;;
        tebingtinggi) kota="Tebing Tinggi" ;;
        bsd) kota="BSD" ;;
        *) kota=$(echo "$folder" | sed 's/\b\(.\)/\u\1/g') ;;
    esac

    url="${BASE_URL}/${folder}/"

    sed -i "s|<h1>MyRepublic</h1>|<h1>MyRepublic ${kota}</h1>|g" "$file"
    sed -i "s|\"url\": \"https://website-anda.com\"|\"url\": \"${url}\"|g" "$file"
    sed -i "s|\"telephone\": \"\"|\"telephone\": \"${PHONE}\"|g" "$file"

    echo "✔ $folder"
done

echo "Selesai."

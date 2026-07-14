#!/bin/bash
OUTPUT="sitemap.xml"

# Header sitemap
echo '<?xml version="1.0" encoding="UTF-8"?>' > $OUTPUT
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' >> $OUTPUT

# Tambahkan URL utama
echo '  <url>' >> $OUTPUT
echo '    <loc>https://salesmyrepublic.my.id/</loc>' >> $OUTPUT
echo '  </url>' >> $OUTPUT

# Loop untuk setiap folder kota
for dir in */; do
    DIR_NAME=${dir%/}
    # Lewati folder sistem atau file tersembunyi
    if [ "$DIR_NAME" == ".git" ] || [ "$DIR_NAME" == "images" ]; then continue; fi
    
    echo "  <url>" >> $OUTPUT
    echo "    <loc>https://salesmyrepublic.my.id/$DIR_NAME/</loc>" >> $OUTPUT
    echo "  </url>" >> $OUTPUT
done

# Footer sitemap
echo '</urlset>' >> $OUTPUT
echo "Sitemap telah diperbarui di $OUTPUT"

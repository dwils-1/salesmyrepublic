#!/data/data/com.termux/files/usr/bin/bash
set -e

CSV="koordinat-kota.csv"
BACKUP_DIR="backup-koordinat-$(date +%Y%m%d-%H%M%S)"

mkdir -p "$BACKUP_DIR"

echo "=== Backup & update koordinat ==="

while IFS=, read -r slug nama lat lng; do
    [ "$slug" = "slug" ] && continue
    [ -z "$slug" ] && continue

    file="$slug/index.html"

    if [ ! -f "$file" ]; then
        echo "SKIP: $file tidak ditemukan"
        continue
    fi

    old=$(grep -oE 'let defaultLat = -?[0-9.]+; let defaultLng = -?[0-9.]+' "$file" | head -1 || true)

    if [ -z "$old" ]; then
        echo "SKIP: $file tidak menemukan defaultLat/defaultLng"
        continue
    fi

    cp "$file" "$BACKUP_DIR/$slug-index.html"

    sed -i "s/let defaultLat = -\?[0-9.]*; let defaultLng = -\?[0-9.]*/let defaultLat = $lat; let defaultLng = $lng/" "$file"

    new=$(grep -oE 'let defaultLat = -?[0-9.]+; let defaultLng = -?[0-9.]+' "$file" | head -1 || true)

    if [ "$new" = "let defaultLat = $lat; let defaultLng = $lng" ]; then
        echo "OK: $slug -> $lat, $lng"
    else
        echo "GAGAL: $slug"
        exit 1
    fi
done < "$CSV"

echo
echo "=== Pemeriksaan HTML ==="

python -m html.parser */index.html

echo
echo "=== Pemeriksaan git diff ==="

git --no-pager diff --check

echo
echo "Selesai."
echo "Backup: $BACKUP_DIR"

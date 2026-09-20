#!/bin/bash
# Script Auto Push Evi Samira Pusat ke GitHub

cd "$(dirname "$0")"

echo "==============================================="
echo "  Auto Push Evi Samira Pusat ke GitHub"
echo "==============================================="

# Memastikan git terinisialisasi
if [ ! -d ".git" ]; then
    echo "⚙️ Memulai inisialisasi Git repository..."
    git init
    git remote add origin https://github.com/dindaridha0-jpg/FIX-EVI-SAMIRA-PUSAT.git
    git branch -M main
fi

# Set remote origin URL terbaru jika perlu
git remote set-url origin https://github.com/dindaridha0-jpg/FIX-EVI-SAMIRA-PUSAT.git 2>/dev/null || git remote add origin https://github.com/dindaridha0-jpg/FIX-EVI-SAMIRA-PUSAT.git

echo "📦 Menambahkan semua file kodingan..."
git add .

echo "📝 Membuat commit..."
git commit -m "Update kodingan Evi Samira Pusat: $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 Mengirim (push) kodingan ke GitHub..."
git push -u origin main

echo "✅ Berhasil push kodingan ke GitHub!"

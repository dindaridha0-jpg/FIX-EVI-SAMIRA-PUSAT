#!/bin/bash
# PUSH KE GITHUB - DOUBLE CLICK DARI FINDER MAC
cd "$(dirname "$0")"

echo "==============================================="
echo "  🚀 PUSH KODINGAN EVI SAMIRA PUSAT KE GITHUB"
echo "==============================================="

# Set credential helper osxkeychain
git config --global credential.helper osxkeychain

# Git add & commit
git add .
git commit -m "Update kodingan Evi Samira Pusat: $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null

echo "📡 Mengirim kodingan ke repository GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "==============================================="
    echo "  ✅ BERHASIL PUSH KE GITHUB!"
    echo "  URL: https://github.com/dindaridha0-jpg/FIX-EVI-SAMIRA-PUSAT"
    echo "==============================================="
else
    echo ""
    echo "==============================================="
    echo "  ⚠️ Catatan Otentikasi GitHub:"
    echo "  Jika diminta Username/Password saat pertama kali push:"
    echo "  • Username: dindaridha0-jpg"
    echo "  • Password: Token GitHub Anda (Personal Access Token)"
    echo "==============================================="
fi

echo ""
read -p "Tekan ENTER untuk menutup jendela ini..."

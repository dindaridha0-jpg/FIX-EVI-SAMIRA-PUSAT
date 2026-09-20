#!/bin/bash
# Klik dua kali file ini di Finder untuk menjalankan website lokal.
cd "$(dirname "$0")" || exit 1
echo "Menjalankan website Evi Samira di http://localhost:4173"
echo "Tutup jendela ini atau tekan Ctrl+C untuk menghentikan server."
ruby server.rb

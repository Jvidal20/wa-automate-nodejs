#!/usr/bin/env bash

set -e  # Termina el script si ocurre un error

echo "📦 Instalando dependencias necesarias..."
apt-get update
apt-get install -y wget unzip

echo "🌐 Descargando Chromium versión estable compatible..."
CHROME_VERSION="130.0.6723.58"
CHROME_ZIP_URL="https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/${CHROME_VERSION}/chrome-linux.zip"

mkdir -p /opt/chrome
wget -q "$CHROME_ZIP_URL" -O /tmp/chrome.zip
unzip -q /tmp/chrome.zip -d /opt/
mv /opt/chrome-linux /opt/chrome

# Crea el enlace simbólico para que Puppeteer lo encuentre como "google-chrome"
ln -sf /opt/chrome/chrome /usr/bin/google-chrome

echo "✅ Chromium instalado en /usr/bin/google-chrome"

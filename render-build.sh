#!/usr/bin/env bash

echo "Instalando Chromium..."

apt-get update
apt-get install -y wget unzip

# Instala una versión compatible de Chromium manualmente
CHROME_VERSION="130.0.6723.58"
CHROME_ZIP="https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/${CHROME_VERSION}/chrome-linux.zip"

mkdir -p /opt/chrome
wget -q $CHROME_ZIP -O chrome-linux.zip
unzip -q chrome-linux.zip -d /opt/
mv /opt/chrome-linux /opt/chrome
ln -s /opt/chrome/chrome /usr/bin/google-chrome

echo "Chromium instalado en /usr/bin/google-chrome"

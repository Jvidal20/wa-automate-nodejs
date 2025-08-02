import express from 'express';
import { create, Client } from '@open-wa/wa-automate';

const app = express();
const PORT = process.env.PORT || 3000;

create({
  sessionId: 'wa-bridge-session',
  headless: true,
  qrTimeout: 0,
  authTimeout: 60,
  multiDevice: true,
  qrPopUpOnly: true,
  puppeteer: require('puppeteer'), // 👈 Usa puppeteer completo aquí
  puppeteerOptions: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
}).then((client: Client) => start(client));

function start(client: Client) {
  client.onMessage(async message => {
    if (message.body.toLowerCase() === 'hola') {
      await client.sendText(message.from, '👋 ¡Hola! Soy tu asistente personal.');
    }
  });
}

app.get('/', (_req, res) => res.send('✅ WA Bridge conectado con WhatsApp'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

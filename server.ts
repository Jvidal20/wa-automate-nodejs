import express from 'express';
import { create, Client } from '@open-wa/wa-automate';
import puppeteer from 'puppeteer'; // 👈 Importar puppeteer completo

const app = express();
const PORT = process.env.PORT || 10000;

(async () => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const localRevisions = await browserFetcher.localRevisions();
  const revisionInfo = await browserFetcher.revisionInfo(localRevisions[0]);

  create({
    sessionId: 'wa-bridge-session',
    headless: true,
    qrTimeout: 0,
    authTimeout: 60,
    multiDevice: true,
    qrPopUpOnly: true,
    puppeteerOptions: {
      executablePath: revisionInfo.executablePath, // 👈 Usamos Chrome descargado por puppeteer
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
  }).then((client: Client) => {
    start(client);
  }).catch(err => {
    console.error('Error al iniciar el cliente de WhatsApp:', err);
  });
})();

function start(client: Client) {
  client.onMessage(async message => {
    if (message.body.toLowerCase() === 'hola') {
      await client.sendText(message.from, '👋 ¡Hola! Soy tu asistente personal.');
    }
  });
}

app.get('/', (_req, res) => res.send('✅ WA Bridge está conectado con WhatsApp'));

app.listen(PORT, () => {
  console.log(`🚀 Server escuchando en puerto ${PORT}`);
});

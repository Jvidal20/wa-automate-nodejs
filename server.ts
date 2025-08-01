import express from 'express';
import { create, Client } from '@open-wa/wa-automate';

const app = express();
const PORT = process.env.PORT || 10000;

create({
  sessionId: 'wa-bridge-session',
  headless: true,
  qrTimeout: 0, // Espera infinita por el QR
  authTimeout: 60,
  multiDevice: true,
  useChrome: true,
  popup: true,
  qrPopUpOnly: true
}).then((client: Client) => start(client));

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

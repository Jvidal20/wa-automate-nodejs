import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = process.env.PORT || 3000;

app.get('/check', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();

    await browser.close();
    res.status(200).send(`Título de la página: ${title}`);
  } catch (err) {
    console.error('Error al lanzar puppeteer:', err);
    res.status(500).send('Error al lanzar puppeteer');
  }
});

app.get('/', (_, res) => {
  res.send('✅ Servidor funcionando correctamente.');
});

app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${port}`);
});

import express from "express";
import { create } from "@open-wa/wa-automate";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("✅ Servidor funcionando correctamente.");
});

(async () => {
  try {
    console.log("🟡 Inicializando sesión de WhatsApp...");
    
    const client = await create({
        headless: true,
        executablePath: "/usr/bin/google-chrome", 
    });

    console.log("🟢 Cliente creado con éxito");

    client.onMessage(async (message) => {
      console.log("📩 Mensaje recibido:", message.body);
      if (message.body === "ping") {
        await client.sendText(message.from, "pong");
      }
    });

  } catch (error) {
    console.error("🔴 Error al iniciar cliente WA:", error);
  }
})();

app.listen(port, () => {
  console.log(`✅ Servidor Express corriendo en puerto ${port}`);
});

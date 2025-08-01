import express from 'express';

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (_req, res) => res.send('✅ WA Bridge is running'));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

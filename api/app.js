const express = require('express');
const cors = require('cors');
const app = express();
const scrapeData = require('./scrapeData');
const port = 3001;
app.use(cors());

app.get('/lyrics/:slug', async (req, res) => {
  const lyrics = await scrapeData(`https://genius.com/${req.params.slug}`);
  res.json({ lyrics });
});

app.listen(port, () => console.log(`Listening on port:${port}`));

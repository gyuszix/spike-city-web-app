const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const BUILD_DIR = path.join(__dirname, 'build');

app.use(express.static(BUILD_DIR));

app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Spike City frontend listening on port ${PORT}`);
});

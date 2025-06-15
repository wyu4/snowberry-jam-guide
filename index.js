const express = require("express");
const app = express();
const path = require("path");

const doc = path.join(__dirname, "public");

app.use(express.static(doc, {
  index: "index.html"
}));

app.get('/README.md', (req, res) => {
  res.sendFile(path.join(doc, 'README.md'));
});

module.exports = app;
const express = require("express");
const app = express();
const path = require("path");

const doc = path.join(__dirname, "public");

app.use(express.static(doc, {
  index: "index.html"
}));

module.exports = app;
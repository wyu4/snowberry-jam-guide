const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const docs = path.join(__dirname, "public");

app.use(express.static(docs));

app.get("/", (req, res) => res.sendFile(path.join(docs, "index.html")));

module.exports = app;
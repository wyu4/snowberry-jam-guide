const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const docs = path.join(__dirname, "docs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile(path.join(docs, "index.html")));

app.get("/:filename.md", (req, res) => {
  const mdFilePath = path.join(docs, `${req.params.filename}.md`);
  console.log(mdFilePath);

  fs.readFile(mdFilePath, "utf8", (err, data) => {
    if (err) {
      res.status(404).send("Markdown file not found");
      return;
    }
    res.set("Content-Type", "text/markdown");
    res.send(data);
  });
});

module.exports = app;
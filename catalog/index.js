const express = require("express");
const cors = require("cors");
const catalog = require("./plants");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*", // allow all origins - for demo purposes
  })
);

// read model:

app.get("/catalog/plants", (req, res) => {
  res.json(catalog);
});

app.listen(port, () => {
  console.log(`Catalog service listening at http://localhost:${port}`);
});

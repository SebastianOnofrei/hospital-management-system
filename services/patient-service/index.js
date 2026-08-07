const express = require("express");

const app = express();

const PORT = process.env.PORT || 3006;

app.get("/", (req, res) => {
  res.send("Hellooooo from Patient service");
});

app.listen(PORT, () => {
  console.log(`Patient service started on localhost port ${PORT}`);
});

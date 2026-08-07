const express = require("express");

const app = express();

const PORT = process.env.PORT || 3004;

app.get("/", (req, res) => {
  res.send("Hellooooo from Doctor service");
});

app.listen(PORT, () => {
  console.log(`Doctor service started on localhost port ${PORT}`);
});

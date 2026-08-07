const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hellooooo from service");
});

app.listen(PORT, () => {
  console.log(`Server started on localhost port ${PORT}`);
});

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send("Hellooooo from Auth service");
});

app.listen(PORT, () => {
  console.log(`Auth Service started on localhost port ${PORT}`);
});

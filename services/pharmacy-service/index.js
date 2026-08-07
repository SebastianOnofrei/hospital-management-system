const express = require("express");

const app = express();

const PORT = process.env.PORT || 3007;

app.get("/", (req, res) => {
  res.send("Hellooooo from Pharmacy service");
});

app.listen(PORT, () => {
  console.log(`Pharmacy service started on localhost port ${PORT}`);
});

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3003;

app.get("/", (req, res) => {
  res.send("Hellooooo from Billing service");
});

app.listen(PORT, () => {
  console.log(`Billing Service started on localhost port ${PORT}`);
});

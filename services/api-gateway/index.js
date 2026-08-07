const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hellooooo from API GATEWAY ");
});

app.listen(PORT, () => {
  console.log(`API Gateway Server started on localhost port ${PORT}`);
});

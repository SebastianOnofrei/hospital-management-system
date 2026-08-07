const express = require("express");

const app = express();

const PORT = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hellooooo from Notification service");
});

app.listen(PORT, () => {
  console.log(`Notification service started on localhost port ${PORT}`);
});

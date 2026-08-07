const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hellooooo from Appointment service");
});

app.listen(PORT, () => {
  console.log(`Appointment Service started on localhost port ${PORT}`);
});

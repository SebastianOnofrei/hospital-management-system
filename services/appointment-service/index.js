const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hellooooo from Appointment service");
});

app.get("/health/live", (req, res) => {
  res.json({
    status: "healthy ✅",
    message: "Appointment Service is up and running ",
    service: "Appointment Service",
  });
});

// ready means ready to accept traffic - all dependencies for receiving requests are up and running
app.get("/health/ready", (req, res) => {
  try {
    // DB check and other dependencies in future development
  } catch (error) {
    // error message must be checked and seen where the problem happend.
    res.json({
      status: "unhealthy ❌",
      service: "Appointment Service",
      dependencies: ["Database ❌"],
    });
  }

  res.json({
    status: "healthy ✅",
    service: "Appointment Service",
    dependencies: ["Database ✅"],
  });
});

app.listen(PORT, () => {
  console.log(`Appointment Service started on localhost port ${PORT}`);
});

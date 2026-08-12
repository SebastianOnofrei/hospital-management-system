const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hellooooo from Notification service");
});

app.get("/health/live", (req, res) => {
  res.json({
    status: "healthy ✅",
    message: "Notification Service is up and running ",
    service: "Notification Service",
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
      service: "Notification Service",
      dependencies: ["Database ❌"],
    });
  }

  res.json({
    status: "healthy ✅",
    service: "Notification Service",
    dependencies: ["Database ✅"],
  });
});

app.listen(PORT, () => {
  console.log(`Notification service started on localhost port ${PORT}`);
});

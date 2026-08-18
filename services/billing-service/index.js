const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 3003;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hellooooo from Billing service");
});

app.get("/health/live", (req, res) => {
  res.json({
    status: "healthy ✅",
    message: "Billing Service is up and running ",
    service: "Billing Service",
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
      error: error,
      service: "Billing Service",
      dependencies: ["Database ❌"],
    });
  }

  res.json({
    status: "healthy ✅",
    service: "Billing Service",
    dependencies: ["Database ✅"],
  });
});

app.listen(PORT, () => {
  console.log(`Billing Service started on localhost port ${PORT}`);
});

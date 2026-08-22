import app from "../app";

app.get("/", (req, res) => {
  res.send("Hellooooo from Auth service");
});

app.get("/health/live", (req, res) => {
  res.json({
    status: "healthy ✅",
    message: "Auth Service is up and running ",
    service: "Auth Service",
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
      service: "Auth Service",
      dependencies: ["Database ❌"],
    });
  }

  res.json({
    status: "healthy ✅",
    service: "Auth Service",
    dependencies: ["Database ✅"],
  });
});

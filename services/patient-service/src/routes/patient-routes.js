import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hellooooo from Patient service");
});

router.get("/health/live", (req, res) => {
  res.json({
    status: "healthy ✅",
    message: "Patient Service is up and running ",
    service: "Patient Service",
  });
});

// ready means ready to accept traffic - all dependencies for receiving requests are up and running
router.get("/health/ready", (req, res) => {
  try {
    // DB check and other dependencies in future development
  } catch (error) {
    // error message must be checked and seen where the problem happend.
    res.json({
      status: "unhealthy ❌",
      error,
      service: "Patient Service",
      dependencies: ["Database ❌"],
    });
  }

  res.json({
    status: "healthy ✅",
    service: "Patient Service",
    dependencies: ["Database ✅"],
  });
});

export default router;

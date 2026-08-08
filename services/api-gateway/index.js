const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const { checkService } = require("../../utils/helpers/checkServiceHealth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  "/api/appointment",
  createProxyMiddleware({
    target: process.env.APPOINTMENT_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/api/billing",
  createProxyMiddleware({
    target: process.env.BILLING_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/api/doctor",
  createProxyMiddleware({
    target: process.env.DOCTOR_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/api/notification",
  createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/api/patient",
  createProxyMiddleware({
    target: process.env.PATIENT_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/api/pharmacy",
  createProxyMiddleware({
    target: process.env.PHARMACY_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hellooooo from API GATEWAY ");
});

// live means that the server is started
app.get("/health/live", (req, res) => {
  res.json({
    status: "healthy ✅",
    message: "API Gateway is up and running",
    service: "API Gateway",
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
      service: "API Gateway Service",
      dependencies: [],
    });
  }

  res.json({
    status: "healthy ✅",
    service: "API Gateway Service",
    dependencies: [],
  });
});

// endpoint that aggregates all microservices health checks

app.get("/health/services", async (req, res) => {
  const services = {
    auth: process.env.AUTH_SERVICE_URL,
    appointment: process.env.APPOINTMENT_SERVICE_URL,
    billing: process.env.BILLING_SERVICE_URL,
    doctor: process.env.DOCTOR_SERVICE_URL,
    notification: process.env.NOTIFICATION_SERVICE_URL,
    patient: process.env.PATIENT_SERVICE_URL,
    pharmacy: process.env.PHARMACY_SERVICE_URL,
  };

  const results = await Promise.all(
    Object.entries(services).map(async ([name, url]) => {
      const result = await checkService(name, url);

      return [name, result];
    }),
  );

  const serviceStatuses = Object.fromEntries(results);

  const allHealthy = Object.values(serviceStatuses).every(
    (service) => service.status === "healthy",
  );

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? "healthy" : "degraded",
    services: serviceStatuses,
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway Server started on localhost port ${PORT}`);
});

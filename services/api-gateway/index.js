const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

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

app.listen(PORT, () => {
  console.log(`API Gateway Server started on localhost port ${PORT}`);
});

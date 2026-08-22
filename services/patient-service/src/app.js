import express from "express";
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

import {
  patientLogger,
  createHttpLogger,
  createErrorHandler,
} from "../../../packages/logger/src/index";

import patientRoutes from "./routes/patient-routes";

const app = express();

const httpLogger = createHttpLogger(patientLogger);

// HTTP request logging
app.use(httpLogger);

// Disable x-powered-by
app.disable("x-powered-by");

// Security headers - helmet
app.use(helmet());

// Body parsing
app.use(express.json({ limit: "1mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);

// Routes
app.use("/patients", patientRoutes);

// ERROR Handling - always last middleware to be used.
app.use(createErrorHandler());

export default app;

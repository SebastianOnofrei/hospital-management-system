import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import {
  appointmentLogger,
  createHttpLogger,
  createErrorHandler,
} from "../../../packages/logger/src/index.js";

import apppointmentRoutes from "./routes/appointment-routes.js";

const app = express();

const httpLogger = createHttpLogger(appointmentLogger);

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
app.use("/appointment", apppointmentRoutes);

// ERROR Handling - always last middleware to be used.
app.use(createErrorHandler());

export default app;

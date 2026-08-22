import express from "express";
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

import {
  authLogger,
  createHttpLogger,
} from "../../../packages/logger/src/index";

import authRoutes from "./routes/auth-routes";
import errorHandler from "./middleware/error-handler";

const app = express();

const httpLogger = createHttpLogger(authLogger);

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
app.use("/auth", authRoutes);

// ERROR Handling - always last middleware to be used.
app.use(errorHandler);

export default app;

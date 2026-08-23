import { authLogger } from "../../../packages/logger/src";
import app from "./app";

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  authLogger.info(
    {
      port: PORT,
    },
    "Auth service started",
  );
});

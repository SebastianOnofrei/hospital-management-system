import { notificationLogger } from "../../../packages/logger/src";
import app from "./app";

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  notificationLogger.info(
    {
      port: PORT,
    },
    "Notification service started",
  );
});

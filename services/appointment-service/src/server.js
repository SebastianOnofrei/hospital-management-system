import { appointmentLogger } from "../../../packages/logger/src";
import app from "./app";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  appointmentLogger.info(
    {
      port: PORT,
    },
    "Appointment service started",
  );
});

import { patientLogger } from "../../../packages/logger/src";
import app from "./app";

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  patientLogger.info(
    {
      port: PORT,
    },
    "Patient service started",
  );
});

import { pharmacyLogger } from "../../../packages/logger/src";
import app from "./app";

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
  pharmacyLogger.info(
    {
      port: PORT,
    },
    "Pharmacy service started",
  );
});

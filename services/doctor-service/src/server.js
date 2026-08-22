import { doctorLogger } from "../../../packages/logger/src";
import app from "./app";

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  doctorLogger.info(
    {
      port: PORT,
    },
    "Doctor service started",
  );
});

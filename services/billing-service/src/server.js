import { billingLogger } from "../../../packages/logger/src";
import app from "./app";

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  billingLogger.info(
    {
      port: PORT,
    },
    "Billing service started",
  );
});

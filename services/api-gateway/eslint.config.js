import { defineConfig } from "eslint";

export default defineConfig([
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
]);

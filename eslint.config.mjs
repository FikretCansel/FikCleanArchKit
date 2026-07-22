import { defineConfig } from "eslint/config";
import { cleanArchitectureConfig } from "@repo/eslint-config/clean-architecture";
import { nextJsConfig } from "@repo/eslint-config/next-js";

const eslintConfig = defineConfig([
  ...nextJsConfig,
  {
    settings: {
      next: {
        rootDir: "apps/web/"
      }
    }
  },
  ...cleanArchitectureConfig
]);

export default eslintConfig;

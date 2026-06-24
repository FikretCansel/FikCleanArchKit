import type { FeatureModuleDefinition } from "@/shared/architecture";

export const authModule: FeatureModuleDefinition = {
  name: "Auth",
  boundedContext: "auth",
  path: "src/features/auth",
  responsibility: "Login, register, token ownership and session boundaries.",
  layers: ["domain", "application", "infrastructure", "presentation"],
  publicApi: ["Auth domain events", "Auth use cases", "Auth repository contracts"],
  communication: "events"
};

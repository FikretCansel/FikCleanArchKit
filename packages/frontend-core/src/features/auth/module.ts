import type { FeatureModuleDefinition } from "@core/shared/architecture";

export const authModule: FeatureModuleDefinition = {
  name: "Auth",
  boundedContext: "auth",
  path: "packages/frontend-core/src/features/auth",
  responsibility: "Login, register, token ownership and session boundaries.",
  layers: ["domain", "application", "infrastructure"],
  publicApi: ["Auth domain events", "Auth use cases", "Auth repository contracts"],
  communication: "events"
};

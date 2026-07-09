import type { FeatureModuleDefinition } from "@core/shared/architecture";

export const userPreferencesModule: FeatureModuleDefinition = {
  name: "User Preferences",
  boundedContext: "user-preferences",
  path: "packages/frontend-core/src/features/user-preferences",
  responsibility: "Theme, device, layout and user rendering preference contracts.",
  layers: ["domain", "application", "infrastructure"],
  publicApi: ["Preference models", "Device abstractions", "Layout strategy contracts"],
  communication: "abstractions"
};

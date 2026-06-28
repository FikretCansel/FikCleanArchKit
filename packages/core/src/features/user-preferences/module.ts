import type { FeatureModuleDefinition } from "@core/shared/architecture";

export const userPreferencesModule: FeatureModuleDefinition = {
  name: "User Preferences",
  boundedContext: "user-preferences",
  path: "packages/core/src/features/user-preferences",
  responsibility: "Theme, device, layout and user rendering preferences.",
  layers: ["domain", "application", "infrastructure", "presentation"],
  publicApi: ["Preference models", "Device abstractions", "Layout strategy contracts"],
  communication: "abstractions"
};

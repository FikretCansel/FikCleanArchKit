import type { FeatureModuleDefinition } from "@core/shared/architecture";

export const notificationModule: FeatureModuleDefinition = {
  name: "Notification",
  boundedContext: "notification",
  path: "packages/core/src/features/notification",
  responsibility: "Toast requests, system messages and notification rendering.",
  layers: ["domain", "application", "infrastructure", "presentation"],
  publicApi: ["Notification events", "Notification contracts", "Toast view models"],
  communication: "events"
};

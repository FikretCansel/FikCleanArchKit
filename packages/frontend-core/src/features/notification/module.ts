import type { FeatureModuleDefinition } from "@core/shared/architecture";

export const notificationModule: FeatureModuleDefinition = {
  name: "Notification",
  boundedContext: "notification",
  path: "packages/frontend-core/src/features/notification",
  responsibility: "Toast requests, system messages and notification contracts.",
  layers: ["domain", "application", "infrastructure"],
  publicApi: ["Notification events", "Notification contracts", "Toast view models"],
  communication: "events"
};

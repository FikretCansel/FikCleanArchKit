import type { ArchitectureLayer } from "./layers";
import type { FeatureModuleDefinition } from "./FeatureModule";

export type FeatureBoundary = FeatureModuleDefinition & {
  name: "Auth" | "Catalog" | "User Preferences" | "Notification";
};

const cleanArchitectureLayers: ArchitectureLayer[] = [
  "domain",
  "application",
  "infrastructure",
  "presentation"
];

export const featureBoundaries: FeatureBoundary[] = [
  {
    name: "Auth",
    boundedContext: "auth",
    path: "src/features/auth",
    responsibility: "Login, register, token ownership, session boundaries.",
    layers: cleanArchitectureLayers,
    publicApi: ["domain events", "application use cases", "repository contracts"],
    communication: "events"
  },
  {
    name: "Catalog",
    boundedContext: "catalog",
    path: "src/features/catalog",
    responsibility: "Product listing and product read state.",
    layers: cleanArchitectureLayers,
    publicApi: ["product read models", "catalog queries", "repository contracts"],
    communication: "events"
  },
  {
    name: "User Preferences",
    boundedContext: "user-preferences",
    path: "src/features/user-preferences",
    responsibility: "Theme, device, layout and user rendering preferences.",
    layers: cleanArchitectureLayers,
    publicApi: ["preference models", "device abstractions", "layout contracts"],
    communication: "abstractions"
  },
  {
    name: "Notification",
    boundedContext: "notification",
    path: "src/features/notification",
    responsibility: "Toast requests, system messages and notification rendering.",
    layers: cleanArchitectureLayers,
    publicApi: ["notification events", "notification contracts"],
    communication: "events"
  }
];

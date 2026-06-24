import type { ArchitectureLayer } from "./layers";

export type FeatureBoundary = {
  name: "Auth" | "Catalog" | "User Preferences" | "Notification";
  path: string;
  responsibility: string;
  layers: ArchitectureLayer[];
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
    path: "src/features/auth",
    responsibility: "Login, register, token ownership, session boundaries.",
    layers: cleanArchitectureLayers
  },
  {
    name: "Catalog",
    path: "src/features/catalog",
    responsibility: "Product listing and product read state.",
    layers: cleanArchitectureLayers
  },
  {
    name: "User Preferences",
    path: "src/features/user-preferences",
    responsibility: "Theme, device, layout and user rendering preferences.",
    layers: cleanArchitectureLayers
  },
  {
    name: "Notification",
    path: "src/features/notification",
    responsibility: "Toast requests, system messages and notification rendering.",
    layers: cleanArchitectureLayers
  }
];

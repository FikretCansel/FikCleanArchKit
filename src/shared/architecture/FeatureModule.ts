import type { ArchitectureLayer } from "./layers";

export type FeatureModuleDefinition = {
  name: string;
  boundedContext: string;
  path: string;
  responsibility: string;
  layers: ArchitectureLayer[];
  publicApi: string[];
  communication: "events" | "abstractions";
};

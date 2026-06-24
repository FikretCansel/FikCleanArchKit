export type ArchitectureLayer =
  | "domain"
  | "application"
  | "infrastructure"
  | "presentation";

export type LayerDefinition = {
  name: ArchitectureLayer;
  responsibility: string;
  mayDependOn: ArchitectureLayer[];
};

export const architectureLayers: Record<ArchitectureLayer, string> = {
  domain: "Business rules, entities, value objects, domain events, repository contracts.",
  application: "Use cases, queries, commands, orchestration, ports.",
  infrastructure: "API clients, repository implementations, persistence, external adapters.",
  presentation: "React components, pages, hooks, view models, UI state binding."
};

export const layerDependencyRules: LayerDefinition[] = [
  {
    name: "domain",
    responsibility: architectureLayers.domain,
    mayDependOn: []
  },
  {
    name: "application",
    responsibility: architectureLayers.application,
    mayDependOn: ["domain"]
  },
  {
    name: "infrastructure",
    responsibility: architectureLayers.infrastructure,
    mayDependOn: ["domain", "application"]
  },
  {
    name: "presentation",
    responsibility: architectureLayers.presentation,
    mayDependOn: ["application", "domain"]
  }
];

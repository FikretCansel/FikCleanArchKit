export type ArchitectureLayer =
  | "domain"
  | "application"
  | "infrastructure"
  | "presentation";

export const architectureLayers: Record<ArchitectureLayer, string> = {
  domain: "Business rules, entities, value objects, domain events, repository contracts.",
  application: "Use cases, queries, commands, orchestration, ports.",
  infrastructure: "API clients, repository implementations, persistence, external adapters.",
  presentation: "React components, pages, hooks, view models, UI state binding."
};

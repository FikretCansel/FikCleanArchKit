import { fileURLToPath } from "node:url";
import boundaries from "eslint-plugin-boundaries";

const repoRoot = fileURLToPath(new URL("../..", import.meta.url));

const cleanArchitectureElements = [
  {
    type: "core-domain",
    pattern: "packages/frontend-core/src/features/*/domain/**"
  },
  {
    type: "core-application",
    pattern: "packages/frontend-core/src/features/*/application/**"
  },
  {
    type: "core-infrastructure",
    pattern: "packages/frontend-core/src/features/*/infrastructure/**"
  },
  {
    type: "core-shared",
    pattern: "packages/frontend-core/src/shared/**"
  },
  {
    type: "web-app",
    pattern: "apps/web/src/app/**"
  },
  {
    type: "web-composition",
    pattern: "apps/web/src/composition/**"
  },
  {
    type: "web-presentation",
    pattern: "apps/web/src/features/*/presentation/**"
  },
  {
    type: "web-infrastructure",
    pattern: "apps/web/src/features/*/infrastructure/**"
  },
  {
    type: "web-components",
    pattern: "apps/web/src/components/**"
  }
];

const layerPolicies = [
  {
    from: { element: { type: "core-domain" } },
    allow: {
      to: { element: { types: { anyOf: ["core-domain", "core-shared"] } } }
    }
  },
  {
    from: { element: { type: "core-application" } },
    allow: {
      to: {
        element: {
          types: { anyOf: ["core-application", "core-domain", "core-shared"] }
        }
      }
    }
  },
  {
    from: { element: { type: "core-infrastructure" } },
    allow: {
      to: {
        element: {
          types: {
            anyOf: [
              "core-infrastructure",
              "core-application",
              "core-domain",
              "core-shared"
            ]
          }
        }
      }
    }
  },
  {
    from: { element: { type: "core-shared" } },
    allow: {
      to: { element: { type: "core-shared" } }
    }
  }
];

const appPolicies = [
  {
    from: { element: { type: "web-app" } },
    allow: {
      to: {
        element: {
          types: {
            anyOf: [
              "web-app",
              "web-composition",
              "web-presentation",
              "web-components",
              "core-domain",
              "core-application",
              "core-shared"
            ]
          }
        }
      }
    }
  },
  {
    from: { element: { type: "web-composition" } },
    allow: {
      to: {
        element: {
          types: {
            anyOf: [
              "web-composition",
              "web-presentation",
              "web-infrastructure",
              "web-components",
              "core-domain",
              "core-application",
              "core-infrastructure",
              "core-shared"
            ]
          }
        }
      }
    }
  },
  {
    from: { element: { type: "web-presentation" } },
    allow: {
      to: {
        element: {
          types: {
            anyOf: [
              "web-presentation",
              "web-components",
              "core-domain",
              "core-application",
              "core-shared"
            ]
          }
        }
      }
    }
  },
  {
    from: { element: { type: "web-infrastructure" } },
    allow: {
      to: {
        element: {
          types: {
            anyOf: [
              "web-infrastructure",
              "core-domain",
              "core-application",
              "core-infrastructure",
              "core-shared"
            ]
          }
        }
      }
    }
  },
  {
    from: { element: { type: "web-components" } },
    allow: {
      to: {
        element: {
          types: { anyOf: ["web-components", "core-domain", "core-shared"] }
        }
      }
    }
  }
];

export const cleanArchitectureConfig = [
  {
    plugins: {
      boundaries
    },
    settings: {
      "boundaries/root-path": repoRoot,
      "boundaries/include": ["apps/web/src/**/*", "packages/frontend-core/src/**/*"],
      "boundaries/elements": cleanArchitectureElements
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "allow",
          policies: [
            ...layerPolicies,
            ...appPolicies,
            {
              from: { element: { type: "core-domain" } },
              disallow: {
                to: {
                  element: {
                    types: {
                      anyOf: [
                        "core-application",
                        "core-infrastructure",
                        "web-app",
                        "web-composition",
                        "web-presentation",
                        "web-infrastructure",
                        "web-components"
                      ]
                    }
                  }
                }
              }
            },
            {
              from: { element: { type: "core-application" } },
              disallow: {
                to: {
                  element: {
                    types: {
                      anyOf: [
                        "core-infrastructure",
                        "web-app",
                        "web-composition",
                        "web-presentation",
                        "web-infrastructure",
                        "web-components"
                      ]
                    }
                  }
                }
              }
            },
            {
              from: { element: { type: "web-presentation" } },
              disallow: {
                to: {
                  element: {
                    types: { anyOf: ["core-infrastructure", "web-infrastructure"] }
                  }
                }
              }
            }
          ]
        }
      ],
      "boundaries/no-unknown-files": "off",
      "boundaries/no-unknown-dependencies": "off"
    }
  }
];

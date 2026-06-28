import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(appRoot, "../..");
const coreSrc = join(repoRoot, "packages/core/src");
const appNodeModules = join(appRoot, "node_modules");
const reactPackage = join(appNodeModules, "react");

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true
  },
  outputFileTracingRoot: repoRoot,
  turbopack: {
    root: repoRoot,
    resolveAlias: {
      "@core": coreSrc,
      react: reactPackage,
      "react/jsx-runtime": join(reactPackage, "jsx-runtime.js"),
      "react/jsx-dev-runtime": join(reactPackage, "jsx-dev-runtime.js")
    }
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@core": coreSrc,
      react: reactPackage,
      "react/jsx-runtime": join(reactPackage, "jsx-runtime.js"),
      "react/jsx-dev-runtime": join(reactPackage, "jsx-dev-runtime.js")
    };
    config.resolve.modules = [
      appNodeModules,
      ...(config.resolve.modules ?? [])
    ];

    return config;
  }
};

export default nextConfig;

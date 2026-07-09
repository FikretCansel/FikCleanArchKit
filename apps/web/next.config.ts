import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(appRoot, "../..");
const coreSrc = join(repoRoot, "packages/core/src");

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true
  },
  outputFileTracingRoot: repoRoot,
  turbopack: {
    root: repoRoot,
    resolveAlias: {
      "@core": coreSrc
    }
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@core": coreSrc
    };

    return config;
  }
};

export default nextConfig;

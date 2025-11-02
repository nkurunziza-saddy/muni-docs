import { defaultMuniConfig, type MuniConfig } from "./schema";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { readFileSync, existsSync } from "node:fs";

// Cache for loaded config to avoid re-importing
let configCache: MuniConfig | null = null;

/**
 * Load muni.config.ts from the consumer's project root
 * Falls back to default config if not found
 * Uses dynamic import which works with Next.js TypeScript compilation
 */
export async function loadMuniConfigAsync(configPath?: string): Promise<MuniConfig> {
  if (configCache) {
    return configCache;
  }

  try {
    const cwd = process.cwd();
    
    let userConfig: any = null;
    let lastError: Error | undefined;

    // Try using createRequire to load from the consumer's project
    try {
      const { createRequire } = await import("node:module");
      // Create require function from the consumer's package.json
      const packageJsonPath = resolve(cwd, "package.json");
      
      if (!existsSync(packageJsonPath)) {
        throw new Error("package.json not found");
      }
      
      const requireFromCwd = createRequire(pathToFileURL(packageJsonPath).href);
      
      // Try different paths - require resolves relative to the file passed to createRequire
      const configPaths = [
        "./muni.config",      // Relative to package.json (same dir)
        "./muni.config.js",   // If Next.js compiled it
        resolve(cwd, "muni.config"),  // Absolute path
        resolve(cwd, "muni.config.js"),
      ];
      
      for (const configPath of configPaths) {
        try {
          userConfig = requireFromCwd(configPath);
          break;
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          continue;
        }
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }

    if (!userConfig) {
      throw lastError || new Error("Config file not found");
    }

    const config = userConfig.default || userConfig;

    // Merge with defaults, ensuring navigation is always an array
    const mergedConfig = {
      ...defaultMuniConfig,
      ...config,
      navigation: Array.isArray(config.navigation) 
        ? config.navigation 
        : defaultMuniConfig.navigation,
    };

    configCache = mergedConfig;
    return mergedConfig;
  } catch (error) {
    // Config not found or error loading, use defaults
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `muni.config.ts not found or error loading: ${error instanceof Error ? error.message : String(error)}. Using default configuration.`,
      );
    }
    const defaultConfig = { ...defaultMuniConfig };
    configCache = defaultConfig;
    return defaultConfig;
  }
}

/**
 * Synchronous version that uses cached config or defaults
 * Use this in contexts where async is not possible (like generateStaticParams)
 * Note: For best results, the config should be loaded first with loadMuniConfigAsync
 * in an async context, which will populate the cache.
 */
export function loadMuniConfig(configPath?: string): MuniConfig {
  if (configCache) {
    return configCache;
  }

  // If not cached, return defaults
  // The async version should be called first in async contexts to populate cache
  const defaultConfig = { ...defaultMuniConfig };
  configCache = defaultConfig;
  return defaultConfig;
}

/**
 * Get the default configuration
 */
export function getDefaultConfig(): MuniConfig {
  return { ...defaultMuniConfig };
}


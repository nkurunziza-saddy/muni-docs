import { __spreadProps, __spreadValues } from './chunk-AGBISES3.js';
import { pathToFileURL } from 'url';
import { resolve } from 'path';
import { existsSync } from 'fs';

// src/lib/config/schema.ts
var defaultMuniConfig = {
  title: "Documentation",
  version: "1.0.0",
  defaultTheme: "light",
  showFrontmatterMeta: true,
  headingLinks: [],
  navigation: []
};
var configCache = null;
async function loadMuniConfigAsync(configPath) {
  if (configCache) {
    return configCache;
  }
  try {
    const cwd = process.cwd();
    let userConfig = null;
    let lastError;
    try {
      const { createRequire } = await import('module');
      const packageJsonPath = resolve(cwd, "package.json");
      if (!existsSync(packageJsonPath)) {
        throw new Error("package.json not found");
      }
      const requireFromCwd = createRequire(pathToFileURL(packageJsonPath).href);
      const configPaths = [
        "./muni.config",
        // Relative to package.json (same dir)
        "./muni.config.js",
        // If Next.js compiled it
        resolve(cwd, "muni.config"),
        // Absolute path
        resolve(cwd, "muni.config.js")
      ];
      for (const configPath2 of configPaths) {
        try {
          userConfig = requireFromCwd(configPath2);
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
    const mergedConfig = __spreadProps(__spreadValues(__spreadValues({}, defaultMuniConfig), config), {
      navigation: Array.isArray(config.navigation) ? config.navigation : defaultMuniConfig.navigation
    });
    configCache = mergedConfig;
    return mergedConfig;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `muni.config.ts not found or error loading: ${error instanceof Error ? error.message : String(error)}. Using default configuration.`
      );
    }
    const defaultConfig = __spreadValues({}, defaultMuniConfig);
    configCache = defaultConfig;
    return defaultConfig;
  }
}
function loadMuniConfig(configPath) {
  if (configCache) {
    return configCache;
  }
  const defaultConfig = __spreadValues({}, defaultMuniConfig);
  configCache = defaultConfig;
  return defaultConfig;
}
function getDefaultConfig() {
  return __spreadValues({}, defaultMuniConfig);
}

// src/lib/navigation/tree.ts
function buildNavigationTree(config) {
  return config.navigation;
}
function getAllSlugs(items) {
  if (!items || !Array.isArray(items)) {
    return [];
  }
  const slugs = [];
  for (const item of items) {
    if (item == null ? void 0 : item.slug) {
      slugs.push(item.slug);
    }
    if ((item == null ? void 0 : item.items) && Array.isArray(item.items)) {
      slugs.push(...getAllSlugs(item.items));
    }
  }
  return slugs;
}
function flattenNavigation(items) {
  const flat = [];
  for (const item of items) {
    flat.push(item);
    if (item.items) {
      flat.push(...flattenNavigation(item.items));
    }
  }
  return flat;
}

// src/lib/navigation/finder.ts
function findPageInNav(items, targetSlug) {
  for (const item of items) {
    if (item.slug === targetSlug) return item;
    if (item.items) {
      const found = findPageInNav(item.items, targetSlug);
      if (found) return found;
    }
  }
  return null;
}
function findParentPage(items, targetSlug, parent = null) {
  for (const item of items) {
    if (item.slug === targetSlug) return parent;
    if (item.items) {
      const found = findParentPage(item.items, targetSlug, item);
      if (found) return found;
    }
  }
  return null;
}

export { buildNavigationTree, findPageInNav, findParentPage, flattenNavigation, getAllSlugs, getDefaultConfig, loadMuniConfig, loadMuniConfigAsync };
//# sourceMappingURL=chunk-2GNXCEVV.js.map
//# sourceMappingURL=chunk-2GNXCEVV.js.map
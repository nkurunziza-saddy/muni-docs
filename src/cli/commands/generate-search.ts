import { generateSearchData } from "../../lib/search/generator";

interface GenerateSearchOptions {
  contentDir?: string;
  output?: string;
  baseUrl?: string;
}

export async function generateSearchCommand(options: GenerateSearchOptions) {
  console.log("Generating search data...\n");

  try {
    generateSearchData({
      contentDir: options.contentDir,
      outputPath: options.output,
      baseUrl: options.baseUrl,
    });

    console.log("\n✅ Search data generated successfully!");
  } catch (error) {
    console.error("❌ Error generating search data:", error);
    process.exit(1);
  }
}


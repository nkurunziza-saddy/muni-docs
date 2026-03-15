import type { ShikiTransformer } from "shiki";

export const transformerLineNumbers = (): ShikiTransformer => ({
  name: "line-numbers",
  pre(hast) {
    const rawMeta = this.options.meta?.__raw;
    if (!rawMeta || !rawMeta.includes("showLineNumbers")) return;

    if (!hast.properties.className) {
      hast.properties.className = ["has-line-numbers"];
    } else if (Array.isArray(hast.properties.className)) {
      if (!hast.properties.className.includes("has-line-numbers")) {
        hast.properties.className.push("has-line-numbers");
      }
    } else if (typeof hast.properties.className === "string") {
      if (!hast.properties.className.includes("has-line-numbers")) {
        hast.properties.className += " has-line-numbers";
      }
    }
  },
  code(hast) {
    const rawMeta = this.options.meta?.__raw;
    if (!rawMeta || !rawMeta.includes("showLineNumbers")) return;

    hast.properties["data-line-numbers"] = true;
  },
  line(hast, lineNumber) {
    const rawMeta = this.options.meta?.__raw;
    if (!rawMeta || !rawMeta.includes("showLineNumbers")) return;

    hast.properties["data-line-number"] = lineNumber;
  },
});

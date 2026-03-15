import { codeToHtml } from "shiki";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers";
import { PreClient } from "./pre-client";

// Custom transformers
import { transformerLineNumbers } from "@/lib/shiki/transformer-line-numbers";
import { transformerNotationInclude } from "@/lib/shiki/transformer-include";

interface HighlightedCodeProps {
  code: string;
  lang: string;
  title?: string;
  className?: string;
  meta?: string;
  isTabContent?: boolean;
}

// React attribute mapping
const attrMap: Record<string, string> = {
  class: "className",
  tabindex: "tabIndex",
  readonly: "readOnly",
  for: "htmlFor",
};

export async function HighlightedCode({
  code,
  lang,
  title,
  className,
  meta,
  isTabContent,
  ...props
}: HighlightedCodeProps) {
  let highlightedHtml = "";
  
  // List of common languages to ensure we don't fail
  // Shiki bundles many, but some like 'dockerignore' might be missing depending on version
  const safeLang = lang === 'dockerignore' ? 'text' : lang;

  try {
    highlightedHtml = await codeToHtml(code, {
      lang: safeLang,
      meta: { __raw: meta },
      themes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
      defaultColor: false,
      transformers: [
        transformerRemoveNotationEscape(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
        transformerNotationFocus({ matchAlgorithm: "v3" }),
        transformerNotationHighlight({ matchAlgorithm: "v3" }),
        transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
        transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
        // Custom
        transformerNotationInclude({
          rootDir: process.cwd(),
        }),
        transformerLineNumbers(),
        // Add classes to <pre> based on what's inside
        {
          name: 'meta-classes',
          pre(hast) {
            const code = this.source;
            if (code.includes('// [!code hl]') || code.includes('// [!code highlight]')) {
              this.addClassToHast(hast, 'has-highlighted');
            }
            if (code.includes('// [!code ++]') || code.includes('// [!code --]')) {
              this.addClassToHast(hast, 'has-diff');
            }
            if (code.includes('// [!code focus]')) {
              this.addClassToHast(hast, 'has-focused');
            }
          }
        }
      ],
    });
  } catch (e) {
    console.error(`Shiki highlighting failed for lang "${lang}":`, e);
    // Fallback to plain text if highlighting fails
    try {
        highlightedHtml = await codeToHtml(code, {
            lang: 'text',
            themes: { dark: "vitesse-dark", light: "vitesse-light" },
            defaultColor: false,
        });
    } catch (innerError) {
        highlightedHtml = `<code>${code}</code>`;
    }
  }

  // Extract attributes from <pre>
  const preMatch = highlightedHtml.match(/<pre([^>]*)>/);
  const preAttrsStr = preMatch ? preMatch[1] : "";
  
  // Extract attributes from <code>
  const codeMatch = highlightedHtml.match(/<code([^>]*)>([\s\S]*)<\/code>/);
  const codeAttrsStr = codeMatch ? codeMatch[1] : "";
  const codeInnerHtml = codeMatch ? codeMatch[2] : code;

  // Helper to parse attributes string into an object with React mapping
  const parseAttrs = (attrsStr: string) => {
    const attrs: Record<string, string> = {};
    const regex = /(\w+[-\w]*)=(?:"([^"]*)"|'([^']*)'|(\S+))/g;
    let match;
    while ((match = regex.exec(attrsStr)) !== null) {
      const name = match[1].toLowerCase();
      const value = match[2] || match[3] || match[4];
      const reactName = attrMap[name] || match[1];
      attrs[reactName] = value;
    }
    return attrs;
  };

  const preAttrs = parseAttrs(preAttrsStr);
  const codeAttrs = parseAttrs(codeAttrsStr);

  return (
    <PreClient
      {...props}
      className={className}
      data-lang={lang}
      data-title={title}
      rawCode={code}
      isTabContent={isTabContent}
      shikiAttrs={{
        pre: preAttrs,
        code: codeAttrs,
      }}
    >
      <code 
        {...codeAttrs}
        className={`font-mono text-sm ${codeAttrs.className || ''} language-${lang}`}
        dangerouslySetInnerHTML={{ __html: codeInnerHtml }}
      />
    </PreClient>
  );
}

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
import { transformerTitle } from "@/lib/shiki/transformer-title";
import { transformerTagline } from "@/lib/shiki/transformer-tagline";
import { transformerNotationInclude } from "@/lib/shiki/transformer-include";

interface HighlightedCodeProps {
  code: string;
  lang: string;
  title?: string;
  className?: string;
  meta?: string;
  isTabContent?: boolean;
}

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
  
  try {
    highlightedHtml = await codeToHtml(code, {
      lang,
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
        transformerTitle(),
        transformerTagline(),
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
    console.error("Shiki highlighting failed:", e);
    highlightedHtml = code;
  }

  // Extract attributes from <pre>
  const preMatch = highlightedHtml.match(/<pre([^>]*)>/);
  const preAttrsStr = preMatch ? preMatch[1] : "";
  
  // Extract attributes from <code>
  const codeMatch = highlightedHtml.match(/<code([^>]*)>([\s\S]*)<\/code>/);
  const codeAttrsStr = codeMatch ? codeMatch[1] : "";
  const codeInnerHtml = codeMatch ? codeMatch[2] : code;

  // Helper to parse attributes string into an object
  const parseAttrs = (attrsStr: string) => {
    const attrs: Record<string, string> = {};
    const regex = /(\w+[-\w]*)=(?:"([^"]*)"|'([^']*)'|(\S+))/g;
    let match;
    while ((match = regex.exec(attrsStr)) !== null) {
      attrs[match[1]] = match[2] || match[3] || match[4];
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
        className={`font-mono text-sm ${codeAttrs.class || ''} language-${lang}`}
        dangerouslySetInnerHTML={{ __html: codeInnerHtml }}
      />
    </PreClient>
  );
}

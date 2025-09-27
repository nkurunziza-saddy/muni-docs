# MDX Plugin Building Guide

## Understanding the Plugin Types

### 1. **Remark Plugins** (Markdown AST)

- **When**: Process markdown syntax before it becomes HTML
- **Use for**: Custom markdown syntax, directives, frontmatter processing
- **Input**: Markdown AST (mdast)
- **Output**: Modified Markdown AST

```typescript
import { visit } from "unist-util-visit";
import type { Root } from "mdast";

export function myRemarkPlugin() {
  return (tree: Root) => {
    visit(tree, "nodeType", (node) => {
      // Transform markdown nodes
    });
  };
}
```

### 2. **Rehype Plugins** (HTML AST)

- **When**: Process HTML after markdown conversion
- **Use for**: HTML manipulation, adding classes, post-processing
- **Input**: HTML AST (hast)
- **Output**: Modified HTML AST

```typescript
import { visit } from "unist-util-visit";
import type { Element } from "hast";

export function myRehypePlugin() {
  return (tree: any) => {
    visit(tree, "element", (node: Element) => {
      // Transform HTML elements
    });
  };
}
```

### 3. **Shiki Transformers** (Code Processing)

- **When**: Process code blocks during syntax highlighting
- **Use for**: Code transformations, adding metadata, line numbers
- **Input**: Shiki's internal AST
- **Output**: Modified code representation

```typescript
import type { ShikiTransformer } from "shiki";

export const myTransformer = (): ShikiTransformer => ({
  name: "my-transformer",
  preprocess(code) {
    // Transform raw code string
    return code;
  },
  root(hast) {
    // Transform the highlighted HTML
  },
  code(hast) {
    // Transform individual code blocks
  },
});
```

## Your Clean Architecture Patterns

### Pattern 1: Directive-to-Component Mapping

```typescript
// Remark stage: :::callout -> <div data-component="Callout">
export function remarkCallout() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "callout") return;

      const data = (node.data ??= {}) as any;
      node.attributes = {
        ...(node.attributes ?? {}),
        class: `callout callout-${node.attributes?.type || "info"}`,
        "data-component": "Callout",
        "data-type": node.attributes?.type || "info",
      };

      data.hName = "div";
      data.hProperties = h("div", node.attributes).properties;
    });
  };
}

// MDX Components: Route data-component to React components
div: ({ children, "data-component": component, ...props }) => {
  if (component === "Callout") {
    return <Callout {...props}>{children}</Callout>;
  }
  return <div {...props}>{children}</div>;
};
```

### Pattern 2: Progressive Enhancement with Transformers

```typescript
// Shiki Transformer: Add metadata to code blocks
export const transformerTitle = (): ShikiTransformer => ({
  name: "title",
  root(hast) {
    const titleMatch = this.options.meta?.__raw?.match(/title="(.*?)"/);
    if (!titleMatch) return;

    const child = hast.children[0] as any;
    hast.children = [
      {
        ...child,
        properties: {
          ...child.properties,
          "data-title": titleMatch[1],
          "data-lang": this.options.lang,
        },
      },
    ];
  },
});

// Rehype Plugin: Transform the enhanced HTML
export const rehypeCodeTitle = () => (tree: any) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName !== "pre") return;

    const title = node.properties?.["data-title"];
    if (title) {
      // Wrap in container with title
      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["code-block-with-title"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["code-title"] },
            children: [{ type: "text", value: title }],
          },
          { ...node },
        ],
      };
      Object.assign(node, wrapper);
    }
  });
};
```

### Pattern 3: File System Integration

```typescript
// Clean file inclusion with proper error handling
export const transformerNotationInclude = ({
  rootDir,
}: {
  rootDir: string;
}): ShikiTransformer => ({
  name: "includes",
  preprocess(code) {
    return processIncludes({
      code,
      getSource(fileName) {
        if (!fileName.startsWith("~")) return undefined;

        const fullPath = resolve(rootDir, fileName.replace("~/", "./"));
        try {
          return readFileSync(fullPath, "utf-8").replace(/\n$/, "");
        } catch (error) {
          console.warn(`[MDX Include] File not found: ${fileName}`);
          return `// File not found: ${fileName}`;
        }
      },
    });
  },
});
```

## Building Your Own Plugins

### Step 1: Choose the Right Plugin Type

**Use Remark when you need to:**

- Process custom markdown syntax
- Handle directives (:::callout)
- Transform markdown structure
- Work with frontmatter

**Use Rehype when you need to:**

- Modify HTML output
- Add CSS classes
- Post-process generated HTML
- Integrate with existing HTML

**Use Shiki Transformers when you need to:**

- Process code blocks
- Add syntax highlighting features
- Transform code content
- Add metadata to code

### Step 2: Follow the Clean Architecture

```typescript
// 1. Remark: Handle syntax -> semantic meaning
export function remarkMyDirective() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "my-directive") return;

      // Clean attribute handling
      node.attributes = {
        ...(node.attributes ?? {}),
        "data-component": "MyComponent",
        "data-variant": node.attributes?.variant || "default",
      };

      const data = (node.data ??= {}) as any;
      data.hName = "div";
      data.hProperties = h("div", node.attributes).properties;
    });
  };
}

// 2. Rehype: Enhance HTML structure (optional)
export function rehypeMyEnhancement() {
  return (tree: any) => {
    visit(tree, "element", (node: Element) => {
      if (node.properties?.["data-component"] === "MyComponent") {
        // Add additional processing
        node.properties.className = [
          ...(node.properties.className || []),
          "my-component-enhanced",
        ];
      }
    });
  };
}

// 3. React Component: Handle rendering
function MyComponent({ variant = "default", children, ...props }) {
  return (
    <div className={`my-component my-component--${variant}`} {...props}>
      {children}
    </div>
  );
}
```

### Step 3: Testing Your Plugins

```typescript
// Create a test utility
import { remark } from "remark";
import remarkDirective from "remark-directive";
import { myRemarkPlugin } from "./my-plugin";

function testPlugin(markdown: string) {
  return remark().use(remarkDirective).use(myRemarkPlugin).process(markdown);
}

// Test your plugin
const result = await testPlugin(`
:::my-directive{variant="primary"}
Content goes here
:::
`);

console.log(result.toString());
```

## Best Practices from Your Implementation

### 1. **Clean Error Handling**

```typescript
try {
  const content = readFileSync(path, "utf-8");
  return content.replace(/\n$/, "");
} catch (error) {
  console.warn(`File not found: ${fileName}`);
  return `// Error: ${error.message}`;
}
```

### 2. **Flexible Attribute Handling**

```typescript
node.attributes = {
  ...(node.attributes ?? {}),
  class: `my-class ${node.attributes?.modifier || ""}`.trim(),
  "data-component": "MyComponent",
};
```

### 3. **Type Safety**

```typescript
import type { ContainerDirective } from "mdast-util-directive";
import type { Element } from "hast";
import type { ShikiTransformer } from "shiki";

// Always type your nodes properly
visit(tree, "containerDirective", (node: ContainerDirective) => {
  // TypeScript knows the node structure
});
```

### 4. **Composable Design**

Each plugin does one thing well:

- Remark handles syntax
- Rehype handles HTML enhancement
- Components handle rendering
- Transformers handle code processing

This makes debugging easier and plugins more reusable across projects.

## Migration Strategy for Complex Plugins

For your existing complex plugins like `remarkInferFrontmatter` or `remarkAuthors`:

1. **Keep the core logic** - your algorithms are solid
2. **Update the API** - use the patterns shown above
3. **Add TypeScript** - improve maintainability
4. **Split responsibilities** - separate parsing from rendering
5. **Test incrementally** - migrate one plugin at a time

Your current architecture is excellent - these patterns will translate beautifully to Next.js with better performance and maintainability.

import { cn } from './chunk-ZSFGL4EP.js';
import { __objRest, __spreadValues, __spreadProps } from './chunk-AGBISES3.js';
import { TriangleAlertIcon, Terminal, File, CheckCircle2Icon, LightbulbIcon, InfoIcon, ClipboardCheck, ClipboardCopy } from 'lucide-react';
import React2, { createContext, useCallback, useMemo, useRef, useState, useEffect, useContext } from 'react';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Slot } from '@radix-ui/react-slot';
import * as TabsPrimitive2 from '@radix-ui/react-tabs';

var alertVariants = cva(
  [
    "relative w-full rounded-lg border px-4 py-3 text-sm grid",
    "grid-cols-[0_1fr] has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr]",
    "has-[>svg]:gap-x-3 gap-y-0.5 items-start",
    "[&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        info: "text-blue-700 bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-blue-700/90 dark:text-blue-300 *:data-[slot=alert-description]:dark:text-blue-300/90",
        warning: "text-amber-700 bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-amber-700/90 dark:text-amber-300 *:data-[slot=alert-description]:dark:text-amber-300/90",
        success: "text-emerald-700 bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-emerald-700/90 dark:text-emerald-300 *:data-[slot=alert-description]:dark:text-emerald-300/90",
        note: "text-foreground bg-card",
        tip: "text-sky-700 bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-sky-700/90 dark:text-sky-300 *:data-[slot=alert-description]:dark:text-sky-300/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert(_a) {
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className)
    }, props)
  );
}
function AlertTitle(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )
    }, props)
  );
}
function AlertDescription(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )
    }, props)
  );
}

// components/mdx-error-boundary.tsx
var MDXErrorBoundary = class extends React2.Component {
  constructor(props) {
    super(props);
    this.reset = () => {
      this.setState({ hasError: false, error: void 0 });
    };
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("MDX Error Boundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return /* @__PURE__ */ React2.createElement(
          FallbackComponent,
          {
            error: this.state.error || new Error("Unknown error"),
            reset: this.reset
          }
        );
      }
      return /* @__PURE__ */ React2.createElement(Alert, { variant: "destructive", className: "my-4" }, /* @__PURE__ */ React2.createElement(TriangleAlertIcon, null), /* @__PURE__ */ React2.createElement(AlertTitle, null, "Content Error"), /* @__PURE__ */ React2.createElement(AlertDescription, null, "There was an error rendering this content.", process.env.NODE_ENV === "development" && this.state.error && /* @__PURE__ */ React2.createElement("details", { className: "mt-2" }, /* @__PURE__ */ React2.createElement("summary", { className: "cursor-pointer font-medium" }, "Error Details"), /* @__PURE__ */ React2.createElement("pre", { className: "mt-2 text-xs overflow-auto" }, this.state.error.message))));
    }
    return this.props.children;
  }
};

// mdx-components/base/blockquote.tsx
function Blockquote(props) {
  return /* @__PURE__ */ React.createElement(
    "blockquote",
    __spreadProps(__spreadValues({}, props), {
      className: cn("border-l-2 pl-6 italic", props.className)
    }),
    props.children
  );
}

// mdx-components/heading.tsx
function Heading(_a) {
  var _b = _a, {
    level
  } = _b, props = __objRest(_b, [
    "level"
  ]);
  const Component = `h${level}`;
  return /* @__PURE__ */ React.createElement(
    Component,
    __spreadProps(__spreadValues({}, props), {
      id: props.id,
      className: cn(
        "relative items-center font-semibold text-foreground gap-[0.25em] leading-[1.5em]",
        props.className
      )
    }),
    props.children
  );
}

// mdx-components/base/H1.tsx
function H1(props) {
  return /* @__PURE__ */ React.createElement(
    Heading,
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ",
        props.className
      ),
      level: 1
    })
  );
}

// mdx-components/base/H2.tsx
function H2(props) {
  return /* @__PURE__ */ React.createElement(
    Heading,
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 ",
        props.className
      ),
      level: 2
    })
  );
}

// mdx-components/base/H3.tsx
function H3(props) {
  return /* @__PURE__ */ React.createElement(
    Heading,
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        props.className
      ),
      level: 3
    })
  );
}

// mdx-components/base/H4.tsx
function H4(props) {
  return /* @__PURE__ */ React.createElement(
    Heading,
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        props.className
      ),
      level: 4
    })
  );
}

// mdx-components/base/H5.tsx
function H5(props) {
  return /* @__PURE__ */ React.createElement(
    Heading,
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "scroll-m-20 text-lg font-medium tracking-tight",
        props.className
      ),
      level: 5
    })
  );
}

// mdx-components/base/H6.tsx
function H6(props) {
  return /* @__PURE__ */ React.createElement(
    Heading,
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "scroll-m-20 text-base font-medium tracking-tight",
        props.className
      ),
      level: 6
    })
  );
}

// mdx-components/base/horizontal-rule.tsx
function HorizontalRule(props) {
  return /* @__PURE__ */ React.createElement("hr", __spreadProps(__spreadValues({}, props), { className: cn(`border-t border-border`, props.className) }));
}

// mdx-components/base/kbd.tsx
function Kbd(props) {
  return /* @__PURE__ */ React.createElement(
    "kbd",
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "px-[0.3rem] py-[0.2rem] text-xs font-sans bg-muted border rounded-md",
        props.className
      )
    })
  );
}

// mdx-components/base/list.tsx
function List(_a) {
  var _b = _a, { ordered = false } = _b, props = __objRest(_b, ["ordered"]);
  if (ordered) {
    const _a2 = props, { className } = _a2, rest = __objRest(_a2, ["className"]);
    return /* @__PURE__ */ React.createElement(
      "ol",
      __spreadProps(__spreadValues({}, rest), {
        className: cn("my-2 ml-6", "list-decimal", "[&>li]:mt-2", className)
      })
    );
  } else {
    const _b2 = props, { className } = _b2, rest = __objRest(_b2, ["className"]);
    return /* @__PURE__ */ React.createElement(
      "ul",
      __spreadProps(__spreadValues({}, rest), {
        className: cn("my-2 ml-6", "list-disc", "[&>li]:mt-2", className)
      })
    );
  }
}

// mdx-components/base/list-item.tsx
function ListItem(props) {
  return /* @__PURE__ */ React.createElement("li", __spreadProps(__spreadValues({}, props), { className: `leading-relaxed ${props.className || ""}` }));
}

// mdx-components/base/paragraph.tsx
function Paragraph(props) {
  return /* @__PURE__ */ React.createElement(
    "p",
    __spreadProps(__spreadValues({}, props), {
      className: cn("leading-7 [&:not(:first-child)]:mt-6", props.className)
    })
  );
}

// mdx-components/base/span.tsx
function Span(props) {
  return /* @__PURE__ */ React.createElement("span", __spreadValues({}, props));
}

// mdx-components/base/strong.tsx
function Strong(props) {
  return /* @__PURE__ */ React.createElement("strong", __spreadProps(__spreadValues({}, props), { className: `font-semibold ${props.className || ""}` }));
}

// mdx-components/base/table.tsx
function Table(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "my-2 w-full overflow-y-auto" }, /* @__PURE__ */ React.createElement("table", __spreadProps(__spreadValues({}, props), { className: cn("w-full", props.className) })));
}

// mdx-components/base/table-cell.tsx
function TableCell(props) {
  return /* @__PURE__ */ React.createElement(
    "td",
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        props.className
      )
    })
  );
}

// mdx-components/base/table-header.tsx
function TableHeader(props) {
  return /* @__PURE__ */ React.createElement(
    "th",
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        props.className
      )
    })
  );
}

// mdx-components/base/table-row.tsx
function TableRow(props) {
  return /* @__PURE__ */ React.createElement(
    "tr",
    __spreadProps(__spreadValues({}, props), {
      className: cn("even:bg-muted m-0 border-t p-0", props.className)
    })
  );
}

// components/muni-components/step.tsx
function Step({
  children,
  className,
  title,
  titleLevel = 2,
  step
}) {
  const HeadingComponent = {
    2: H2,
    3: H3,
    4: H4,
    5: H5,
    6: H6
  }[titleLevel];
  return /* @__PURE__ */ React.createElement("div", { className: cn("mb-7", className) }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement("div", { className: "absolute left-[-39px] -top-0.5 flex items-center justify-center size-[34px] bg-muted rounded-full border-[0.5em] border-background text-muted-foreground text-xs font-normal" }, step), typeof title === "string" ? /* @__PURE__ */ React.createElement(HeadingComponent, null, title) : title), /* @__PURE__ */ React.createElement("div", { className: "prose dark:prose-invert" }, children));
}
function Autolink(props) {
  if (!props.href) return null;
  return /* @__PURE__ */ React.createElement(
    Link,
    __spreadProps(__spreadValues({}, props), {
      className: cn("underline hover:text-primary", props.className),
      href: props.href
    })
  );
}

// mdx-components/anchor.tsx
function Anchor({ children, href, className }) {
  const pathname = usePathname();
  const classes = cn(
    "font-medium text-primary underline-offset-4 hover:underline",
    className
  );
  const isAutolinkIcon = typeof children === "object" && children !== null && "props" in children && children.props["data-autolink-icon"];
  if (isAutolinkIcon) {
    return /* @__PURE__ */ React.createElement(Autolink, { className: classes }, children);
  }
  if (href == null ? void 0 : href.startsWith("#")) {
    return /* @__PURE__ */ React.createElement("a", { className: classes, href: `${pathname}${href}` }, children);
  }
  return /* @__PURE__ */ React.createElement(Link, { href: href != null ? href : "#", className: classes }, children);
}
var IsInCodeBlockContext = createContext(false);
var useIsInCodeBlock = () => {
  return useContext(IsInCodeBlockContext);
};

// mdx-components/code/code.tsx
function Code(props) {
  const isInCodeBlock = useIsInCodeBlock();
  const children = filterEmptyLines(props.children);
  return /* @__PURE__ */ React.createElement(
    "code",
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "font-mono text-sm",
        isInCodeBlock ? "" : "bg-muted relative rounded px-[0.3rem] py-[0.2rem]",
        props.className
      )
    }),
    children
  );
}
function filterEmptyLines(nodes) {
  if (!Array.isArray(nodes)) return nodes;
  return nodes.map(
    (child, index) => {
      var _a, _b, _c;
      return (child == null ? void 0 : child.props) && "data-line" in child.props && typeof child.props.children === "string" && child.props.children.trim() === "" && ((_c = (_b = (_a = nodes[index + 1]) == null ? void 0 : _a.props) == null ? void 0 : _b.className) == null ? void 0 : _c.includes("twoslash-tag-line")) ? null : child;
    }
  ).filter(Boolean);
}

// mdx-components/code/code-block.tsx
function CodeBlock(props) {
  return /* @__PURE__ */ React.createElement("div", __spreadProps(__spreadValues({}, props), { className: cn("not-prose ", props.className) }));
}
function CodeTitle(_a) {
  var _b = _a, {
    children,
    className,
    language
  } = _b, props = __objRest(_b, [
    "children",
    "className",
    "language"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadProps(__spreadValues({}, props), {
      className: cn(
        "text-sm not-prose bg-muted/40 backdrop-blur-3xl",
        "flex items-center gap-1.5 px-1 md:px-2 py-2 text-sm font-medium group-[.code-group]:hidden border-b border-input",
        className
      )
    }),
    language === "bash" ? /* @__PURE__ */ React.createElement(Terminal, { size: 14 }) : children.match(/\.(.*)$/) ? /* @__PURE__ */ React.createElement(File, { size: 14 }) : null,
    children
  );
}

// mdx-components/code/figcaption.tsx
function Figcaption(props) {
  return /* @__PURE__ */ React.createElement("figcaption", __spreadValues({}, props));
}

// mdx-components/code/figure.tsx
function Figure(props) {
  return /* @__PURE__ */ React.createElement("figure", __spreadValues({}, props));
}
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button(_a) {
  var _b = _a, {
    className,
    variant,
    size,
    asChild = false
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "size",
    "asChild"
  ]);
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className }))
    }, props)
  );
}

// components/muni-components/copy-button.tsx
function CopyButton({
  copy,
  copied
}) {
  return /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "ghost",
      size: "sm",
      "data-copied": copied,
      onClick: copy,
      type: "button",
      className: "absolute top-1 right-2 opacity-0 group-hover:opacity-100 duration-200 transition-opacity h-8 w-8 p-0"
    },
    copied ? /* @__PURE__ */ React.createElement(ClipboardCheck, { className: "h-4 w-4 text-success-foreground " }) : /* @__PURE__ */ React.createElement(ClipboardCopy, { className: "h-4 w-4 text-muted-foreground" })
  );
}
function useCopyCode() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1e3);
    return () => clearTimeout(timeout);
  }, [copied]);
  function copy() {
    var _a;
    setCopied(true);
    const node = (_a = ref.current) == null ? void 0 : _a.cloneNode(true);
    const nodesToRemove = node == null ? void 0 : node.querySelectorAll(
      "button,.line.diff.remove,.twoslash-popup-info-hover,.twoslash-popup-info,.twoslash-meta-line,.twoslash-tag-line"
    );
    for (const node2 of nodesToRemove != null ? nodesToRemove : []) node2.remove();
    navigator.clipboard.writeText(node == null ? void 0 : node.textContent);
  }
  return {
    copied,
    copy,
    ref
  };
}

// mdx-components/code/pre.tsx
function Pre(_a) {
  var _b = _a, {
    children,
    className,
    isTabContent = false
  } = _b, props = __objRest(_b, [
    "children",
    "className",
    "isTabContent"
  ]);
  const { copied, copy, ref } = useCopyCode();
  const recurseChildren = useCallback(
    (children2) => {
      if (!children2) return children2;
      if (typeof children2 !== "object") return children2;
      if ("props" in children2)
        return __spreadProps(__spreadValues({}, children2), {
          props: __spreadProps(__spreadValues({}, children2.props), {
            children: Array.isArray(children2.props.children) ? children2.props.children.map(recurseChildren) : recurseChildren(children2.props.children)
          })
        });
      return children2;
    },
    []
  );
  const children_ = useMemo(
    () => recurseChildren(children),
    [children, recurseChildren]
  );
  const wrap = (children2) => {
    if (className == null ? void 0 : className.includes("shiki")) {
      return /* @__PURE__ */ React.createElement(
        CodeBlock,
        {
          className: cn(
            isTabContent ? "" : "border rounded-md overflow-hidden border-input"
          )
        },
        props["data-title"] && !isTabContent && /* @__PURE__ */ React.createElement(CodeTitle, { language: props["data-lang"] }, props["data-title"]),
        /* @__PURE__ */ React.createElement("div", { className: "shiki" }, children2)
      );
    }
    return children2;
  };
  return /* @__PURE__ */ React.createElement(IsInCodeBlockContext.Provider, { value: true }, wrap(
    /* @__PURE__ */ React.createElement(
      "pre",
      __spreadProps(__spreadValues({
        ref
      }, props), {
        className: cn(className, "overflow-auto custom-scrollbar")
      }),
      /* @__PURE__ */ React.createElement(CopyButton, { copied, copy }),
      children_
    )
  ));
}
function CodeGroup({
  children,
  className,
  "aria-label": ariaLabel = "Code group"
}) {
  var _a;
  if (!Array.isArray(children)) return null;
  const tabs = children.map((child_) => {
    var _a2, _b;
    const c = child_;
    const childHasTitle = typeof ((_a2 = c.props) == null ? void 0 : _a2["data-title"]) === "string";
    const child = childHasTitle ? c : (_b = c.props) == null ? void 0 : _b.children;
    const props = child && typeof child === "object" && "props" in child ? child.props : {};
    const tabTitle = props == null ? void 0 : props["data-title"];
    return { tabTitle, props };
  });
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive2.Root,
    {
      className: cn(
        "not-prose border border-input rounded-lg mb-6 overflow-hidden",
        className
      ),
      defaultValue: (_a = tabs[0]) == null ? void 0 : _a.tabTitle,
      orientation: "horizontal"
    },
    /* @__PURE__ */ React.createElement(
      TabsPrimitive2.TabsList,
      {
        className: cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 rounded-t-lg"
        ),
        "aria-label": ariaLabel,
        role: "tablist"
      },
      tabs.map(({ tabTitle }, i) => /* @__PURE__ */ React.createElement(
        TabsPrimitive2.TabsTrigger,
        {
          key: tabTitle + i.toString(),
          value: tabTitle != null ? tabTitle : "",
          className: cn(
            "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-3 py-2 transition-colors duration-100 hover:text-foreground hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none"
          ),
          "aria-selected": i === 0,
          tabIndex: i === 0 ? 0 : -1
        },
        tabTitle
      ))
    ),
    tabs.map(({ tabTitle, props }, i) => {
      var _a2;
      const isShiki = String((_a2 = props == null ? void 0 : props.className) != null ? _a2 : "").includes(
        "shiki"
      );
      return /* @__PURE__ */ React.createElement(IsInCodeBlockContext.Provider, { key: tabTitle || i, value: true }, /* @__PURE__ */ React.createElement(
        TabsPrimitive2.Content,
        {
          key: tabTitle || i,
          "data-shiki": isShiki,
          value: tabTitle != null ? tabTitle : "",
          className: cn("focus:outline-none "),
          role: "tabpanel",
          "aria-labelledby": `tab-${tabTitle}`,
          tabIndex: 0
        },
        /* @__PURE__ */ React.createElement(Pre, __spreadValues({ isTabContent: true }, props))
      ));
    })
  );
}
function CodePreviewBlock({
  children,
  className,
  "aria-label": ariaLabel = "Code preview"
}) {
  var _a, _b, _c, _d;
  if (!Array.isArray(children)) return null;
  const previewChild = children[0];
  const codeChild = children[1];
  const props = (_c = (_b = (_a = codeChild == null ? void 0 : codeChild.props) == null ? void 0 : _a.children) == null ? void 0 : _b.props) != null ? _c : codeChild == null ? void 0 : codeChild.props;
  const codeClassName = (_d = codeChild == null ? void 0 : codeChild.props) == null ? void 0 : _d.className;
  const isShiki = String(codeClassName != null ? codeClassName : "").includes("shiki");
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive2.Root,
    {
      className: cn(
        "not-prose border w-full flex-1 border-input rounded-lg mb-6 overflow-hidden",
        className
      ),
      defaultValue: "preview",
      orientation: "horizontal"
    },
    /* @__PURE__ */ React.createElement(
      TabsPrimitive2.TabsList,
      {
        className: cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 rounded-t-lg"
        ),
        "aria-label": ariaLabel,
        role: "tablist"
      },
      /* @__PURE__ */ React.createElement(
        TabsPrimitive2.TabsTrigger,
        {
          value: "preview",
          className: cn(
            "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-3 py-2 transition-colors duration-100 hover:text-foreground hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none "
          ),
          "aria-selected": true,
          tabIndex: 0
        },
        "Preview"
      ),
      /* @__PURE__ */ React.createElement(
        TabsPrimitive2.TabsTrigger,
        {
          value: "code",
          className: cn(
            "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-3 py-2 transition-colors duration-100 hover:text-foreground hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none "
          ),
          "aria-selected": false,
          tabIndex: -1
        },
        "Code"
      )
    ),
    /* @__PURE__ */ React.createElement(
      TabsPrimitive2.Content,
      {
        value: "preview",
        className: "focus:outline-none",
        role: "tabpanel",
        "aria-labelledby": "tab-preview",
        tabIndex: 0
      },
      /* @__PURE__ */ React.createElement("div", { className: "w-full p-6 bg-muted/20 rounded-b-lg not-prose" }, previewChild)
    ),
    /* @__PURE__ */ React.createElement(
      TabsPrimitive2.Content,
      {
        value: "code",
        "data-shiki": isShiki,
        className: "focus:outline-none",
        role: "tabpanel",
        "aria-labelledby": "tab-code",
        tabIndex: 0
      },
      /* @__PURE__ */ React.createElement(IsInCodeBlockContext.Provider, { value: true }, /* @__PURE__ */ React.createElement(Pre, __spreadValues({ isTabContent: true, className: codeClassName }, props)))
    )
  );
}
function Tabs({
  children
}) {
  var _a, _b;
  if (!Array.isArray(children) || !children.length) return null;
  const defaultValue = (_b = (_a = children[0]) == null ? void 0 : _a.props) == null ? void 0 : _b.value;
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive2.Root,
    {
      className: cn("not-prose w-full mb-6 border border-input rounded-lg"),
      defaultValue
    },
    /* @__PURE__ */ React.createElement(
      TabsPrimitive2.List,
      {
        className: cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 rounded-t-lg"
        )
      },
      children.map((child) => {
        var _a2;
        const c = child;
        if (!((_a2 = c == null ? void 0 : c.props) == null ? void 0 : _a2.value)) return null;
        return /* @__PURE__ */ React.createElement(
          TabsPrimitive2.Trigger,
          {
            key: c.props.value,
            value: c.props.value,
            className: cn(
              "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-3 py-2 transition-colors hover:text-foreground hover:bg-muted/60 data-[state=active]:border-primary data-[state=active]:text-primary focus:outline-none"
            )
          },
          c.props.value
        );
      })
    ),
    children.map((child) => {
      var _a2;
      const c = child;
      if (!((_a2 = c == null ? void 0 : c.props) == null ? void 0 : _a2.value)) return null;
      return /* @__PURE__ */ React.createElement(
        TabsPrimitive2.Content,
        {
          key: c.props.value,
          value: c.props.value,
          className: "p-6 focus:outline-none",
          role: "tabpanel",
          "aria-labelledby": `tab-${c.props.value}`,
          tabIndex: 0
        },
        c.props.children
      );
    })
  );
}
function TabsItem({ children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "prose max-w-none" }, children);
}
var alertConfig = {
  note: {
    variant: "note",
    icon: InfoIcon,
    title: "Note"
  },
  info: {
    variant: "info",
    icon: InfoIcon,
    title: "Info"
  },
  warning: {
    variant: "warning",
    icon: TriangleAlertIcon,
    title: "Warning"
  },
  danger: {
    variant: "destructive",
    icon: TriangleAlertIcon,
    title: "Danger"
  },
  tip: {
    variant: "tip",
    icon: LightbulbIcon,
    title: "Tip"
  },
  success: {
    variant: "success",
    icon: CheckCircle2Icon,
    title: "Success"
  }
};
function Callout({ children, type, title, className }) {
  const config = alertConfig[type];
  const Icon = config.icon;
  return /* @__PURE__ */ React.createElement(Alert, { variant: config.variant, className: cn("not-prose", className) }, /* @__PURE__ */ React.createElement(Icon, null), /* @__PURE__ */ React.createElement(AlertTitle, null, title != null ? title : config.title), /* @__PURE__ */ React.createElement(AlertDescription, { className: "no-mdx-block" }, children));
}

// mdx-components/layout/aside.tsx
function Aside(props) {
  if ("data-callout" in props && props["data-callout"]) {
    return /* @__PURE__ */ React.createElement(Callout, { className: cn("", props.className), type: props["data-callout"] }, props.children);
  }
  return /* @__PURE__ */ React.createElement("aside", __spreadValues({ className: cn("", props.className) }, props));
}

// mdx-components/layout/details.tsx
function Details(props) {
  return /* @__PURE__ */ React.createElement("details", __spreadValues({}, props));
}

// mdx-components/subtitle.tsx
function Subtitle({ children }) {
  const classes = "text-muted-foreground text-xl font-light leading-[1.5em] mt-1";
  return /* @__PURE__ */ React.createElement("div", { className: classes }, children);
}

// components/muni-components/steps.tsx
function Steps({ children, className }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn("border-l border-border pl-6 ml-3 mt-6 md:ml-1", className)
    },
    children
  );
}

// mdx-components/layout/steps.tsx
function Steps2({ children }) {
  if (!Array.isArray(children)) return null;
  return /* @__PURE__ */ React.createElement(Steps, { className: "not-prose" }, children.map(({ props }, i) => {
    const [title, ...children2] = Array.isArray(props.children) ? props.children : [props.children];
    return /* @__PURE__ */ React.createElement(Step, { key: i, title, step: i + 1 }, children2);
  }));
}

// mdx-components/layout/div.tsx
function Div(props) {
  if (props.className === "code-group")
    return /* @__PURE__ */ React.createElement(CodeGroup, __spreadValues({}, props));
  if ("data-steps" in props) return /* @__PURE__ */ React.createElement(Steps2, __spreadValues({}, props));
  if (props.role === "doc-subtitle") return /* @__PURE__ */ React.createElement(Subtitle, __spreadValues({}, props));
  return /* @__PURE__ */ React.createElement("div", __spreadValues({}, props));
}

// mdx-components/layout/header.tsx
function Header(props) {
  return /* @__PURE__ */ React.createElement(
    "header",
    __spreadProps(__spreadValues({}, props), {
      className: cn("border-b border-b-input/85 pb-4", props.className)
    })
  );
}

// mdx-components/layout/info-box.tsx
function InfoBox({ children, type, title, className }) {
  return /* @__PURE__ */ React.createElement(Callout, { type, title, className }, children);
}

// mdx-components/footnotes.tsx
function Footnotes(props) {
  return /* @__PURE__ */ React.createElement("section", __spreadValues({}, props));
}

// mdx-components/layout/section.tsx
function Section(props) {
  const classes = "border-t border-border mt-14 pt-6";
  if ("data-footnotes" in props)
    return /* @__PURE__ */ React.createElement(Footnotes, __spreadProps(__spreadValues({}, props), { className: `${props.className || ""} ${classes}` }));
  return /* @__PURE__ */ React.createElement("section", __spreadProps(__spreadValues({}, props), { className: `${props.className || ""} ${classes}` }));
}

// mdx-components/layout/summary.tsx
function Summary(props) {
  const classes = "text-muted-foreground text-xl font-light leading-[1.5em] mt-1";
  return /* @__PURE__ */ React.createElement("summary", __spreadProps(__spreadValues({}, props), { className: `${classes} ${props.className || ""}` }));
}

// mdx-components/index.tsx
var mdxComponents = {
  // Layout components
  Callout: (props) => /* @__PURE__ */ React.createElement(MDXErrorBoundary, null, /* @__PURE__ */ React.createElement(Callout, __spreadValues({}, props))),
  Steps: (props) => /* @__PURE__ */ React.createElement(MDXErrorBoundary, null, /* @__PURE__ */ React.createElement(Steps2, __spreadValues({}, props))),
  Step: (props) => /* @__PURE__ */ React.createElement(MDXErrorBoundary, null, /* @__PURE__ */ React.createElement(Step, __spreadValues({}, props))),
  InfoBox: (props) => /* @__PURE__ */ React.createElement(MDXErrorBoundary, null, /* @__PURE__ */ React.createElement(InfoBox, __spreadValues({}, props))),
  Aside,
  Details,
  Summary,
  Section,
  Header,
  Div,
  // Interactive components
  CodeGroup: (props) => /* @__PURE__ */ React.createElement(MDXErrorBoundary, null, /* @__PURE__ */ React.createElement(CodeGroup, __spreadValues({}, props))),
  CodePreviewBlock: (props) => /* @__PURE__ */ React.createElement(MDXErrorBoundary, null, /* @__PURE__ */ React.createElement(CodePreviewBlock, __spreadValues({}, props))),
  Tabs,
  TabsItem,
  // Code components
  CodeBlock,
  CodeTitle,
  Figure,
  Figcaption,
  // Base HTML elements
  a: Anchor,
  aside: Aside,
  blockquote: Blockquote,
  code: Code,
  details: Details,
  div: Div,
  pre: Pre,
  header: Header,
  figcaption: Figcaption,
  figure: Figure,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: HorizontalRule,
  kbd: Kbd,
  li: ListItem,
  ol: (props) => /* @__PURE__ */ React.createElement(List, __spreadValues({ ordered: true }, props)),
  p: Paragraph,
  section: Section,
  span: Span,
  strong: Strong,
  summary: Summary,
  table: Table,
  td: TableCell,
  th: TableHeader,
  tr: TableRow,
  ul: (props) => /* @__PURE__ */ React.createElement(List, __spreadValues({ ordered: false }, props)),
  // Custom components
  Space: ({
    size = "md",
    className
  }) => /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "block",
        size === "sm" && "my-2",
        size === "md" && "my-64",
        size === "lg" && "my-6",
        size === "xl" && "my-8",
        size === "2xl" && "my-12",
        className
      ),
      "data-component": "space",
      "data-spacing": size
    }
  )
};
function useMDXComponents() {
  return mdxComponents;
}

export { useMDXComponents };
//# sourceMappingURL=client.js.map
//# sourceMappingURL=client.js.map
"use client";
import { useEffect, useRef, useState } from "react";

export function useCopyCode() {
  const ref = useRef<HTMLPreElement>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timeout);
  }, [copied]);

  function copy() {
    setCopied(true);

    if (!ref.current) return;

    // Prefer data-raw for accurate copying (avoids diff signs etc.)
    const raw = ref.current.getAttribute("data-raw");
    if (raw) {
      navigator.clipboard.writeText(raw);
      return;
    }

    const node = ref.current.cloneNode(true) as HTMLPreElement;
    const nodesToRemove = node.querySelectorAll(
      "button,.line.diff.remove,.twoslash-popup-info-hover,.twoslash-popup-info,.twoslash-meta-line,.twoslash-tag-line",
    );
    for (const n of Array.from(nodesToRemove)) n.remove();
    navigator.clipboard.writeText(node.textContent || "");
  }

  return {
    copied,
    copy,
    ref,
  };
}

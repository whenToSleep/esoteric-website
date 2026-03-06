/* eslint-disable @typescript-eslint/no-explicit-any */

export function extractPlainText(
  lexicalContent: any,
  maxLength = 300
): string {
  if (!lexicalContent) return "";

  const texts: string[] = [];

  function walk(node: any) {
    if (!node) return;
    if (node.text) {
      texts.push(node.text);
    }
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        walk(child);
      }
    }
    if (node.root) {
      walk(node.root);
    }
  }

  walk(lexicalContent);

  const full = texts.join(" ").replace(/\s+/g, " ").trim();
  if (full.length <= maxLength) return full;
  return full.slice(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

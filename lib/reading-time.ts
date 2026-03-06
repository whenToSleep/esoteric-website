import { extractPlainText } from "@/lib/rich-text-utils";

export function calculateReadingTime(lexicalContent: unknown): number {
  const text = extractPlainText(lexicalContent, 100000);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

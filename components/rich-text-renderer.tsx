import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { cn } from "@/lib/utils";

interface RichTextRendererProps {
  content: SerializedEditorState | null | undefined;
  className?: string;
}

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content) return null;

  return (
    <div className={cn("prose-alchemy", className)}>
      <RichText data={content} />
    </div>
  );
}

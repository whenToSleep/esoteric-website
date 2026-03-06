import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "locale",
      type: "select",
      options: [
        { label: "English", value: "en" },
        { label: "Русский", value: "ru" },
        { label: "Українська", value: "uk" },
      ],
      defaultValue: "ru",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

import { defineField, defineType } from "sanity";

export const PRODUCT_VISUAL_VARIANTS = [
  { title: "Emerald — amber accent, curve bottom-left", value: "emerald" },
  { title: "Gold — green accent, no curve, dark text", value: "gold" },
  { title: "Meadow — amber accent, curve top-right", value: "meadow" },
] as const;

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: 'Short category, e.g. "Biofertilisant & Biostimulant"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
      description: "Shown on the home page product card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "longDescription",
      title: "Long description",
      type: "text",
      rows: 6,
      description: "Shown on the product detail page overview",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stats",
      title: "Stat pills",
      type: "array",
      of: [{ type: "string" }],
      description: 'Short tags, e.g. "Enhanced NPK"',
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: "benefits",
      title: "Key benefits",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: "bottleImage",
      title: "Bottle illustration",
      type: "image",
      description: "Used on the home page hover card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productImage",
      title: "Product photo",
      type: "image",
      description: "Used on the product detail page hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "visualVariant",
      title: "Visual style",
      type: "string",
      description: "Controls the card's accent color, corner shape, and text contrast — picked from the site's design system.",
      options: { list: [...PRODUCT_VISUAL_VARIANTS] },
      initialValue: "emerald",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "subtitle", media: "bottleImage" },
  },
});

import { defineArrayMember, defineField, defineType } from "sanity";

export const SOLUTION_ICON_KEYS = [
  { title: "Shrimp / chitosan", value: "shrimp" },
  { title: "R&D", value: "rd" },
  { title: "Certification", value: "cert" },
] as const;

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "badgeText", title: "Badge text", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "titleLine1", title: "Headline — line 1", type: "string", description: '"PGPR"', validation: (Rule) => Rule.required() }),
        defineField({ name: "titleLine2", title: "Headline — line 2", type: "string", description: '"Technologies"', validation: (Rule) => Rule.required() }),
        defineField({ name: "titleLine3", title: "Headline — line 3", type: "string", description: '"The Future of Bio"', validation: (Rule) => Rule.required() }),
        defineField({ name: "subtitleLine1", title: "Subtitle — line 1", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subtitleLine2", title: "Subtitle — line 2", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "sustainableHeading",
      title: "Sustainable section — heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sustainTabs",
      title: "Sustainable agriculture tabs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sustainTab",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: "image", title: "Image", type: "image", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "productsHeading",
      title: "Products section — heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productsSubheading",
      title: "Products section — subheading",
      type: "string",
      description: 'e.g. "Hover a product card to explore it"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "solutionsHeading",
      title: "Solutions section — heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "solutions",
      title: "Agricultural solutions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "solution",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: "ctaLabel", title: "CTA label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "ctaTarget",
              title: "CTA target",
              type: "string",
              options: {
                list: [
                  { title: "Contact page", value: "contact" },
                  { title: "External link", value: "external" },
                ],
              },
              initialValue: "contact",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "externalHref",
              title: "External link URL",
              type: "url",
              hidden: ({ parent }) => parent?.ctaTarget !== "external",
            }),
            defineField({ name: "image", title: "Image", type: "image", validation: (Rule) => Rule.required() }),
            defineField({
              name: "iconKey",
              title: "Icon",
              type: "string",
              options: { list: [...SOLUTION_ICON_KEYS] },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "technologyHeading",
      title: "Technology section — heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techItems",
      title: "Technology carousel",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "techItem",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", validation: (Rule) => Rule.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "label", media: "image" } },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "pioneering",
      title: "Pioneering section",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "paragraph1", title: "Paragraph 1", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
        defineField({ name: "paragraph2", title: "Paragraph 2", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
        defineField({ name: "image", title: "Image", type: "image", validation: (Rule) => Rule.required() }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});

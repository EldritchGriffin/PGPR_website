import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "differentiatorsHeading",
      title: "Differentiators — heading",
      type: "string",
      description: 'Use a line break for a two-line heading, e.g. "We are Different\\nin Every Way"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "differentiators",
      title: "Differentiators",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "differentiator",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "stats",
      title: "Stats row",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "number", validation: (Rule) => Rule.required() }),
            defineField({ name: "suffix", title: "Suffix", type: "string", description: 'e.g. "%", "+", "K"' }),
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "teamIntro",
      title: "Team section intro",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "paragraph", title: "Paragraph", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "businessTeamLabel",
      title: "Business team label",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "yearsExperienceLabel", title: "Years of experience label", type: "string", description: 'e.g. "35 Years of Experience"', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "rdTeamLabel",
      title: "R&D team label",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "yearsExperienceLabel", title: "Years of experience label", type: "string", description: 'e.g. "20 Years of Experience"', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "teamBadges",
      title: "Team section floating badges",
      type: "object",
      fields: [
        defineField({ name: "wasteBadge", title: "Waste badge text", type: "string", description: 'Use a line break, e.g. "20T waste\\nper day"', validation: (Rule) => Rule.required() }),
        defineField({ name: "natureBadge", title: "Nature badge text", type: "string", description: 'Use a line break, e.g. "We invest\\nIn nature"', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "officeLocation",
      title: "Office location",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "blurb", title: "Blurb", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
        defineField({ name: "ctaLabel", title: "CTA button label", type: "string", description: 'e.g. "Get in Touch"', validation: (Rule) => Rule.required() }),
        defineField({ name: "latitude", title: "Latitude", type: "number", validation: (Rule) => Rule.required() }),
        defineField({ name: "longitude", title: "Longitude", type: "number", validation: (Rule) => Rule.required() }),
        defineField({
          name: "zoomBoxDegrees",
          title: "Map zoom box (degrees)",
          type: "number",
          description: "Half-width of the map bounding box in degrees — smaller is more zoomed in.",
          initialValue: 0.05,
          validation: (Rule) => Rule.required().positive(),
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});

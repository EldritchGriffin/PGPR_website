import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "text",
      rows: 2,
      description: "Use a line break for a two-line role, e.g. \"Co-founder & CEO\\nMA in Eco-criticism\"",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "flag",
      title: "Flag emoji",
      type: "string",
      description: "e.g. 🇲🇦",
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "group",
      title: "Team",
      type: "string",
      options: {
        list: [
          { title: "Business Development", value: "business" },
          { title: "R&D and Production", value: "rd" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});

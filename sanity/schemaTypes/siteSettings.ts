import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "href", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "footerCopyrightText",
      title: "Footer copyright text",
      type: "string",
      description: 'e.g. "PGPR Technologies © 2026"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Site title (SEO / browser tab)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Site description (SEO)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "navLabels",
      title: "Navigation labels",
      type: "object",
      description: "Labels for the site nav — the links themselves (which pages/sections they point to) are fixed in code.",
      fields: [
        defineField({ name: "home", title: "Home", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "sustainable", title: "Sustainable", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "products", title: "Products", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "services", title: "Services", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "technologies", title: "Technologies", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "about", title: "About", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "contact", title: "Contact (nav CTA button)", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "ctaBanner",
      title: "Shared CTA banner",
      type: "object",
      description: "Shown near the bottom of the home, about, and product pages.",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "text", title: "Text", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
        defineField({ name: "buttonLabel", title: "Button label", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "productUi",
      title: "Product card & page labels",
      type: "object",
      description: "Repeated UI microcopy shared across every product card and the product detail page layout.",
      fields: [
        defineField({ name: "exploreLabel", title: "Product card \"Explore\" label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "moreInfoLabel", title: "\"More info\" button label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "techSheetLabel", title: "\"Tech Sheet\" button label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "requestDemoLabel", title: "\"Request a Demo\" button label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "technicalSheetLabel", title: "\"Technical Sheet\" button label (product hero)", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "overviewHeading", title: "\"Product Overview\" heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "benefitsHeading", title: "\"Key Benefits\" card heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "specificationsHeading", title: "\"Specifications\" card heading", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "moreProductsHeading", title: "\"More of our Products\" heading", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});

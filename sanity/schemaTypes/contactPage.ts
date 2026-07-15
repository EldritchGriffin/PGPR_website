import { defineArrayMember, defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
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
      name: "formIntroHeading",
      title: "Form intro heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formIntroText",
      title: "Form intro text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactCards",
      title: "Contact cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "contactCard",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "value", title: "Value", type: "string", description: "e.g. an email address or phone number", validation: (Rule) => Rule.required() }),
            defineField({
              name: "hrefType",
              title: "Link type",
              type: "string",
              options: {
                list: [
                  { title: "Email", value: "email" },
                  { title: "Phone", value: "phone" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "responseTimeNote",
      title: "Response time note",
      type: "string",
      description: 'e.g. "We typically respond within 24 hours"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sendMessageHeading",
      title: "Form panel heading",
      type: "string",
      description: 'e.g. "Send a Message"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formLabels",
      title: "Form field labels",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "email", title: "Email label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subject", title: "Subject label", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "message", title: "Message label", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "formPlaceholders",
      title: "Form field placeholders",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name placeholder", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "email", title: "Email placeholder", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "subject", title: "Subject placeholder", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "message", title: "Message placeholder", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "submitLabel",
      title: "Submit button label",
      type: "string",
      description: 'e.g. "Send Message"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittingLabel",
      title: "Submit button label (while sending)",
      type: "string",
      description: 'e.g. "Sending…"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "successHeading",
      title: "Success heading",
      type: "string",
      description: 'e.g. "Message sent!"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "successMessage",
      title: "Success message",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sendAnotherLabel",
      title: "\"Send another message\" link label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "genericErrorMessage",
      title: "Generic submission error message",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "networkErrorMessage",
      title: "Network error message",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});

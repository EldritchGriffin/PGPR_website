import { product } from "./product";
import { teamMember } from "./teamMember";
import { testimonial } from "./testimonial";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // Repeatable documents
  product,
  teamMember,
  testimonial,
  // Singletons
  homePage,
  aboutPage,
  contactPage,
  siteSettings,
];

export const SINGLETON_TYPES = new Set([
  "homePage",
  "aboutPage",
  "contactPage",
  "siteSettings",
]);

export const SINGLETON_IDS: Record<string, string> = {
  homePage: "homePage",
  aboutPage: "aboutPage",
  contactPage: "contactPage",
  siteSettings: "siteSettings",
};

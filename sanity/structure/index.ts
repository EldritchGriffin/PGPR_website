import type { StructureResolver } from "sanity/structure";
import { SINGLETON_IDS, SINGLETON_TYPES } from "../schemaTypes";

/**
 * Singletons get a single fixed-id document editor (no list, no "create new").
 * Everything else falls back to Studio's default list view.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId(SINGLETON_IDS.homePage)),
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId(SINGLETON_IDS.aboutPage)),
      S.listItem()
        .title("Contact Page")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId(SINGLETON_IDS.contactPage)),
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId(SINGLETON_IDS.siteSettings)),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.has(item.getId() ?? "")
      ),
    ]);

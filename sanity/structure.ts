import type { StructureResolver } from "sanity/structure";

/**
 * Studio sidebar.
 *
 * Products are listed in the order the client thinks about them:
 * Main Categories → Categories → Products.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Synami Agriscience")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),

      S.divider(),

      S.documentTypeListItem("productSegment").title("1. Main Categories"),
      S.documentTypeListItem("productCategory").title("2. Categories"),
      S.documentTypeListItem("product").title("3. Products"),

      S.divider(),

      S.documentTypeListItem("infoPage").title("Pages"),
      S.documentTypeListItem("lead").title("Enquiries"),
    ]);

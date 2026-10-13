import type { StructureResolver } from "sanity/structure";

/**
 * Studio sidebar.
 *
 * Grouped the way the client thinks about the site rather than the way the
 * schemas happen to be defined: the pages they edit, then the product tree
 * in the order it must be filled, then the things the site collects.
 *
 * Products keep their numbers because the order is a real dependency — a
 * Category can't be saved without a Main Category, and a Product can't be
 * saved without a Category. The numbers tell the client where to start.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Synami Agriscience")
    .items([
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .child(
          S.document().schemaType("homePage").documentId("homePage").title("Home Page")
        ),

      S.documentTypeListItem("infoPage").title("Pages"),

      S.divider(),

      S.documentTypeListItem("productSegment").title("1 · Main Categories"),
      S.documentTypeListItem("productCategory").title("2 · Categories"),
      S.documentTypeListItem("product").title("3 · Products"),

      S.divider(),

      S.documentTypeListItem("lead").title("Enquiries"),
      S.documentTypeListItem("jobApplication").title("Job Applications"),

      S.divider(),

      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
    ]);

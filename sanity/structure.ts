import type { StructureResolver } from "sanity/structure";

/**
 * Studio sidebar.
 *
 * Ordered the way the client works: the pages they edit, then the product
 * tree in the order it must be filled, then what the site collects, then
 * settings they touch once.
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

      S.listItem()
        .title("About")
        .id("aboutGroup")
        .child(
          S.list()
            .title("About")
            .items([
              S.listItem()
                .title("About Synami")
                .id("aboutPage")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                    .title("About Synami")
                ),
              S.listItem()
                .title("Vision & Mission")
                .id("visionMissionPage")
                .child(
                  S.document()
                    .schemaType("visionMissionPage")
                    .documentId("visionMissionPage")
                    .title("Vision & Mission")
                ),
              S.listItem()
                .title("Core Values")
                .id("coreValuesPage")
                .child(
                  S.document()
                    .schemaType("coreValuesPage")
                    .documentId("coreValuesPage")
                    .title("Core Values")
                ),
              S.listItem()
                .title("Founder's Message")
                .id("founderPage")
                .child(
                  S.document()
                    .schemaType("founderPage")
                    .documentId("founderPage")
                    .title("Founder's Message")
                ),
            ])
        ),

      S.documentTypeListItem("infoPage").title("Insights Pages"),

      S.divider(),

      S.listItem()
        .title("Products Page")
        .id("productsPage")
        .child(
          S.document()
            .schemaType("productsPage")
            .documentId("productsPage")
            .title("Products Page")
        ),

      S.documentTypeListItem("productSegment").title("1 · Main Categories"),
      S.documentTypeListItem("productCategory").title("2 · Categories"),
      S.documentTypeListItem("product").title("3 · Products"),

      S.divider(),

      S.documentTypeListItem("lead").title("Enquiries"),
      S.documentTypeListItem("jobApplication").title("Job Applications"),

      S.divider(),

      S.documentTypeListItem("legalPage").title("Legal Pages"),

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

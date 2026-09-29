import { type SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { cta } from "./objects/cta";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { productSegment } from "./productSegment";
import { productCategory } from "./productCategory";
import { product } from "./product";
import { infoPage } from "./infoPage";
import { lead } from "./lead";
import { jobApplication } from "./jobApplication";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    cta,
    siteSettings,
    jobApplication,
    homePage,
    productSegment,
    productCategory,
    product,
    infoPage,
    lead,
  ],
};

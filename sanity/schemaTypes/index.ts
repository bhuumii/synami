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

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    cta,
    siteSettings,
    homePage,
    productSegment,
    productCategory,
    product,
    infoPage,
    lead,
  ],
};

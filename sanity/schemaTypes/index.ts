import { type SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { cta } from "./objects/cta";
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { visionMissionPage } from "./visionMissionPage";
import { coreValuesPage } from "./coreValuesPage";
import { founderPage } from "./founderPage";
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
    homePage,
    aboutPage,
    visionMissionPage,
    coreValuesPage,
    founderPage,
    productSegment,
    productCategory,
    product,
    infoPage,
    lead,
    jobApplication,
  ],
};

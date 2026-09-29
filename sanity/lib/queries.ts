import { groq } from "next-sanity";

/**
 * All GROQ queries in one place.
 *
 * Each asks for exactly the fields the page renders — never `...`.
 * Over-fetching is the main reason CMS-driven pages get slow, and it makes
 * it impossible to tell later which fields are actually in use.
 */

/* ============================================================
   SITE-WIDE
   ============================================================ */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    generalEmail, salesEmail, exportEmail,
    phone, phoneAlt, address,
    mapEmbedUrl, mapLinkUrl,
    linkedin, facebook, instagram, youtube, footerTagline
  }
`;

/**
 * PRODUCT NAVIGATION.
 *
 * Drives the mega menu, the mobile drawer, the homepage cards and the
 * footer — all from one fetch. Add a Main Category in the Studio and it
 * appears in all four with no code change.
 */
export const productNavQuery = groq`
  *[_type == "productSegment"] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    "categories": *[_type == "productCategory" && segment._ref == ^._id]
      | order(order asc){
        _id, title, "slug": slug.current, shortDescription
      }
  }
`;

/** Insights menu — header dropdown, mobile drawer, footer, /capabilities. */
export const capabilityNavQuery = groq`
  *[_type == "infoPage" && section == "capabilities"] | order(order asc){
    _id, title, "slug": slug.current, menuBlurb
  }
`;

/* ============================================================
   HOME
   ============================================================ */

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroHeading, heroSubheading, heroPrimaryCta, heroSecondaryCta,
    whoEyebrow, whoHeading, whoBody, whoCta,
    segmentsEyebrow, segmentsHeading,
    whyEyebrow, whyHeading, whyIntro, whyItems[]{ title, text },
    approachEyebrow, approachHeading, approachSteps[]{ title, text },
    globalEyebrow, globalHeading, globalBody, globalNote,
    globalRegions, globalCta,
    ctaHeading, ctaBody, ctaAudiences, ctaPrimary, ctaSecondary,
    seo
  }
`;

/* ============================================================
   P1 — MAIN CATEGORY
   ============================================================ */

export const segmentSlugsQuery = groq`
  *[_type == "productSegment" && defined(slug.current)]{ "slug": slug.current }
`;

export const segmentBySlugQuery = groq`
  *[_type == "productSegment" && slug.current == $segment][0]{
    _id, title, "slug": slug.current,
    heroImage{ ..., alt },
    shortDescription, description, seo,

    "categories": *[_type == "productCategory" && segment._ref == ^._id]
      | order(order asc){
        _id, title, "slug": slug.current, shortDescription,
        heroImage{ ..., alt },
        "productCount": count(*[_type == "product" && category._ref == ^._id])
      }
  }
`;

/* ============================================================
   P2 — CATEGORY
   ============================================================ */

export const categoryPathsQuery = groq`
  *[_type == "productCategory" && defined(slug.current)
      && defined(segment->slug.current)]{
    "slug": slug.current,
    "segment": segment->slug.current
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "productCategory" && slug.current == $category
      && segment->slug.current == $segment][0]{
    _id, title, "slug": slug.current,
    heroImage{ ..., alt },
    shortDescription, description, seo,
    segment->{ title, "slug": slug.current },

    "products": *[_type == "product" && category._ref == ^._id]
      | order(order asc, title asc){
        _id, title, brandName, "slug": slug.current,
        shortDescription, formulationType,
        heroImage{ ..., alt }
      }
  }
`;

/* ============================================================
   P3 — PRODUCT
   ============================================================ */

export const productPathsQuery = groq`
  *[_type == "product" && defined(slug.current)
      && defined(category->slug.current)
      && defined(category->segment->slug.current)]{
    "slug": slug.current,
    "category": category->slug.current,
    "segment": category->segment->slug.current
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $product
      && category->slug.current == $category][0]{
    _id, title, brandName, "slug": slug.current,
    heroImage{ ..., alt },
    shortDescription, description,
    formulationType, keyFeatures, targetCrops, targetPests,
    dosage, packSizes,
    "brochureUrl": brochure.asset->url,
    seo,
    category->{
      title, "slug": slug.current,
      segment->{ title, "slug": slug.current }
    },

    "related": *[_type == "product"
        && category._ref == ^.category._ref
        && _id != ^._id] | order(order asc, title asc)[0...3]{
      _id, title, "slug": slug.current, shortDescription, formulationType,
      heroImage{ ..., alt }
    }
  }
`;

/* ============================================================
   CONTENT PAGES
   ============================================================ */

/** The About page — there is only one, so no slug needed. */
export const aboutPageQuery = groq`
  *[_type == "infoPage" && section == "about"][0]{
    title, eyebrow, intro,
    heroImage{ ..., alt },
    sections[]{ heading, body, image{ ..., alt } },
    highlights[]{ title, text },
    seo
  }
`;

export const capabilitySlugsQuery = groq`
  *[_type == "infoPage" && section == "capabilities" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const capabilityBySlugQuery = groq`
  *[_type == "infoPage" && section == "capabilities" && slug.current == $slug][0]{
    title, eyebrow, intro,
    heroImage{ ..., alt },
    sections[]{ heading, body, image{ ..., alt } },
    highlights[]{ title, text },
    seo
  }
`;

/** Privacy, Terms. */
export const legalPageBySlugQuery = groq`
  *[_type == "infoPage" && section == "legal" && slug.current == $slug][0]{
    title, eyebrow, intro,
    sections[]{ heading, body },
    seo
  }
`;

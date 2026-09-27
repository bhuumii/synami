import { groq } from "next-sanity";

/* ---------------- Site-wide ---------------- */

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    generalEmail, salesEmail, exportEmail, phone, address,
    linkedin, facebook, instagram, youtube, footerTagline
  }
`;

/**
 * THE NAVIGATION QUERY.
 *
 * Drives the mega menu, the mobile drawer, the homepage cards and the
 * footer — all from one fetch. Every one of those places is now generated
 * from this, so adding a Main Category in the Studio makes it appear in all
 * four without anyone touching code.
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

/* ---------------- Home ---------------- */

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

/* ---------------- P1: Main category ---------------- */

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

/* ---------------- P2: Category ---------------- */

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

/* ---------------- P3: Product ---------------- */

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

/* ---------------- Info pages ---------------- */

export const infoPageSlugsQuery = groq`
  *[_type == "infoPage" && defined(slug.current)]{ "slug": slug.current }
`;

export const infoPageBySlugQuery = groq`
  *[_type == "infoPage" && slug.current == $slug][0]{
    title, "slug": slug.current, eyebrow, intro,
    heroImage{ ..., alt },
    sections[]{ heading, body },
    seo
  }
`;

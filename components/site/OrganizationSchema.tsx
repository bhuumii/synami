const SITE = "https://synamiagriscience.com";

type Settings = {
  generalEmail?: string;
  salesEmail?: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
};

/**
 * Organisation structured data.
 *
 * Tells Google explicitly what this company is, rather than leaving it to
 * infer from page text. It's what Google checks when deciding whether an
 * entity deserves a Knowledge Graph entry — the thing that produces a logo
 * and a descriptor in search suggestions.
 *
 * Values come from Sanity rather than being hardcoded, so the address here
 * can never drift from the one in the footer.
 *
 * The address is parsed from the free-text field: last line is assumed to
 * be "City, State PIN". Loose, but the alternative is asking the client to
 * fill in five separate fields they'd get wrong.
 */
export function OrganizationSchema({ settings }: { settings?: Settings }) {
  const lines = (settings?.address ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const last = lines[lines.length - 1] ?? "";
  const pin = last.match(/\b\d{6}\b/)?.[0];
  const street = lines.slice(0, -1).join(", ") || undefined;

  const sameAs = [
    settings?.linkedin,
    settings?.facebook,
    settings?.instagram,
    settings?.youtube,
  ].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "Synami Agriscience",
    legalName: "Synami Agriscience Private Limited",
    url: SITE,
    logo: `${SITE}/logo.png`,
    image: `${SITE}/opengraph-image.jpg`,
    description:
      "Synami Agriscience develops and supplies crop protection, biologicals and fertilizers for agricultural businesses in India and international markets.",
    ...(settings?.generalEmail ? { email: settings.generalEmail } : {}),
    ...(settings?.phone ? { telephone: settings.phone } : {}),
    ...(lines.length
      ? {
          address: {
            "@type": "PostalAddress",
            ...(street ? { streetAddress: street } : {}),
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            ...(pin ? { postalCode: pin } : {}),
            addressCountry: "IN",
          },
        }
      : {}),
    ...(settings?.phone
      ? {
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: settings.phone,
              contactType: "sales",
              email: settings.salesEmail || settings.generalEmail,
              areaServed: ["IN", "Worldwide"],
              availableLanguage: ["en", "hi"],
            },
          ],
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: [
      "Crop protection",
      "Agrochemicals",
      "Biologicals",
      "Fertilizers",
      "Plant growth regulators",
      "Biostimulants",
    ],
  };

  /* A WebSite node alongside it, so Google can associate the domain with
     the organisation rather than treating them as unrelated. */
  const site = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "Synami Agriscience",
    publisher: { "@id": `${SITE}/#organization` },
    inLanguage: "en-IN",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/site/PageHero";
import { CareerForm } from "@/components/site/CareerForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Synami Agriscience. Send us your details and resume and we'll be in touch if there's a fit.",
};

export const revalidate = 3600;

/**
 * Careers.
 *
 * Uses the same PageHero as About and the Insights pages, so the header
 * treatment is consistent across the whole site: a full-bleed hero with
 * white text over the image when one is set, a pale green block with dark
 * text when it isn't. PageHero handles both and tags the dark variant so
 * the header knows to go transparent.
 */
export default async function CareersPage() {
  const settings: { careersImage?: { alt?: string } } =
    await client.fetch(siteSettingsQuery);

  return (
    <>
      <PageHero
        title="Work with us"
        eyebrow="Careers"
        intro="We're an early-stage agriscience company, which means the people who join now shape how it gets built. If that appeals, send us your details."
        image={settings?.careersImage}
      />

      <section className="bg-paper py-14 md:py-20 lg:py-24">
        <Container width="narrow">
          <p>
            We don&apos;t always have a specific opening posted. We read every
            application regardless, and keep the ones we can&apos;t act on
            immediately.
          </p>

          <h2 className="mt-12 text-2xl">Send us your details</h2>
          <p className="mt-3 text-stone">
            Tell us a little about yourself and attach your resume.
          </p>

          <div className="mt-10">
            <CareerForm />
          </div>
        </Container>
      </section>
    </>
  );
}

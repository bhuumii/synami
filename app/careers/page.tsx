import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CareerForm } from "@/components/site/CareerForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Synami Agriscience. Send us your details and resume and we'll be in touch if there's a fit.",
};

/**
 * Careers — deliberately plainer than the About and Insights pages.
 *
 * No hero image, no alternating sections, no highlight grid. Someone on this
 * page has already decided to apply; every extra element between them and
 * the form is friction. A narrow single column and the form is the whole
 * design.
 */
export default function CareersPage() {
  return (
    <>
      <section className="bg-field pb-14 pt-36 md:pb-16 md:pt-44">
        <Container width="narrow">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-leaf">
            Careers
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-ink">
            Work with us
          </h1>
          <p className="mt-6 text-lg">
            We&apos;re an early-stage agriscience company, which means the
            people who join now shape how it gets built. If that appeals, send
            us your details.
          </p>
          <p className="mt-4">
            We don&apos;t always have a specific opening posted. We read every
            application regardless, and keep the ones we can&apos;t act on
            immediately.
          </p>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <Container width="narrow">
          <CareerForm />
        </Container>
      </section>
    </>
  );
}

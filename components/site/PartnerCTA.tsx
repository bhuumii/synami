import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Cta = { label?: string; href?: string };

export function PartnerCTA({
  heading,
  body,
  audiences,
  primaryCta,
  secondaryCta,
}: {
  heading?: string;
  body?: string;
  audiences: string[];
  primaryCta?: Cta;
  secondaryCta?: Cta;
}) {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-white md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-pill bg-leaf-bright/10 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <h2 className="max-w-[16ch] text-4xl text-white">{heading}</h2>
          {body ? <p className="mt-7 max-w-[52ch] text-white/85">{body}</p> : null}
        </Reveal>

        {audiences.length > 0 ? (
          <Reveal delay={0.1}>
            <ul className="mt-12 flex flex-wrap gap-3">
              {audiences.map((a) => (
                <li
                  key={a}
                  className="rounded-pill border border-white/25 px-4 py-2 text-sm text-white/90"
                >
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap gap-4">
            {primaryCta?.label ? (
              <Button href={primaryCta.href || "/contact"} variant="onDark">
                {primaryCta.label}
              </Button>
            ) : null}
            {secondaryCta?.label ? (
              <Button
                href={secondaryCta.href || "/products"}
                variant="outline"
                className="border-white/40 text-white hover:border-white hover:bg-white hover:text-forest"
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

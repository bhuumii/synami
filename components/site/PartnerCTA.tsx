import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const audiences = [
  "Importers",
  "Distributors",
  "Agrochemical companies",
  "Fertilizer companies",
  "Agricultural input companies",
  "Private label brands",
  "Contract manufacturing partners",
];

export function PartnerCTA() {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-white md:py-32">
      {/* A single soft light source, off-canvas. Depth without a gradient mesh. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-pill bg-leaf-bright/10 blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <h2 className="max-w-[16ch] text-4xl text-white">
            Let&apos;s build the future of agriculture together
          </h2>
          <p className="mt-7 max-w-[52ch] text-white/85">
            Whether you are looking for agricultural products, private-label
            solutions, bulk supply or customized product development, we
            welcome the conversation.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 flex flex-wrap gap-x-3 gap-y-3">
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

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" variant="onDark">
              Send an enquiry
            </Button>
            <Button
              href="/products"
              variant="outline"
              className="border-white/40 text-white hover:border-white hover:bg-white hover:text-forest"
            >
              Browse products
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

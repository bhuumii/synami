import { cn } from "@/lib/utils";

type Tone = "paper" | "field" | "mist" | "navy" | "leaf";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-stone",
  field: "bg-field text-stone",
  mist: "bg-mist text-stone",
  navy: "bg-navy-deep text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white",
  leaf: "bg-leaf text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white",
};

const sizes = {
  sm: "py-14 md:py-20",
  md: "py-14 md:py-20 lg:py-28",
  lg: "py-24 md:py-36",
};

/**
 * A full-width horizontal band. The page reads as a rhythm of these:
 * paper → field → navy → paper → leaf → paper.
 *
 * Vertical spacing lives ONLY here, never on the children. That keeps
 * section padding from being cancelled out by competing selectors.
 */
export function Section({
  children,
  tone = "paper",
  size = "md",
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: Tone;
  size?: keyof typeof sizes;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("w-full", tones[tone], sizes[size], className)}>
      {children}
    </section>
  );
}

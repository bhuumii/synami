import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "onDark";

/**
 * v2: the outline variant borders in LEAF, not navy.
 * Navy is now a text colour only — it no longer appears as a border or fill.
 *
 * Every variant also gets a subtle shadow shift on hover, so buttons feel
 * physical rather than just changing colour.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-leaf text-white shadow-[var(--shadow-rest)] hover:bg-leaf-deep hover:shadow-[var(--shadow-lift)]",
  outline:
    "border border-leaf/30 text-leaf hover:border-leaf hover:bg-leaf hover:text-white",
  ghost:
    "text-leaf hover:text-leaf-deep underline underline-offset-4 decoration-1",
  onDark:
    "bg-white text-forest shadow-[var(--shadow-rest)] hover:bg-field hover:shadow-[var(--shadow-lift)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-pill px-7 py-3.5",
        "font-display text-sm font-medium tracking-wide",
        "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

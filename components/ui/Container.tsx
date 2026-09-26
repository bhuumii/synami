import { cn } from "@/lib/utils";

/**
 * Horizontal container. Every section's content sits inside one of these
 * so the left edge is identical down the whole page.
 *
 * width="wide"   1240px — the default
 * width="narrow" 780px  — long-form reading (About, Quality)
 */
export function Container({
  children,
  className,
  width = "wide",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        width === "wide" ? "max-w-[1240px]" : "max-w-[780px]",
        className
      )}
    >
      {children}
    </div>
  );
}

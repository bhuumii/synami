/**
 * Section label pill.
 *
 * Small tracked caps floating above a large heading has nothing holding
 * it — it reads as a stray line. Contained in a bordered pill with a dot
 * it becomes an object, and the eye has somewhere to start.
 *
 * Shared so every section on the site uses the same marker rather than
 * each one inventing its own.
 */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!children) return null;

  const skin =
    tone === "dark"
      ? "border-white/25 bg-white/10 text-leaf-bright"
      : "border-leaf/25 bg-leaf/[0.07] text-leaf";

  const dot = tone === "dark" ? "bg-leaf-bright" : "bg-leaf";

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-pill border px-4 py-1.5 ${skin} ${className}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-pill ${dot}`} />
      <span className="font-display text-xs font-medium uppercase tracking-[0.18em]">
        {children}
      </span>
    </span>
  );
}

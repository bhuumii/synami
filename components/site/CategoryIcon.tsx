"use client";

import {
  Bug, Sprout, Leaf, Droplets, FlaskConical, ShieldCheck, Wheat,
  TreePine, Microscope, SprayCan, Beaker, Atom, Sun, CloudRain,
  TestTube, Recycle, Tractor, Factory, Package, Globe, Layers,
  Flower2, Carrot, Waves, HeartPulse, Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon set shared by main categories (P1) and categories (P2).
 *
 * One map rather than two, so a client who picks "shield" for Crop
 * Protection and "shield" for Fungicides gets the same mark in both
 * places — which is what makes it read as a system.
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  // crop protection
  bug: Bug,
  shield: ShieldCheck,
  spray: SprayCan,
  wheat: Wheat,
  // growth and biology
  sprout: Sprout,
  leaf: Leaf,
  flower: Flower2,
  tree: TreePine,
  microscope: Microscope,
  heart: HeartPulse,
  // nutrition and chemistry
  beaker: Beaker,
  flask: FlaskConical,
  testtube: TestTube,
  atom: Atom,
  droplets: Droplets,
  zap: Zap,
  // field and supply
  tractor: Tractor,
  factory: Factory,
  package: Package,
  layers: Layers,
  carrot: Carrot,
  // environment
  sun: Sun,
  rain: CloudRain,
  waves: Waves,
  recycle: Recycle,
  globe: Globe,
};

/**
 * Medallion: concentric ring, crosshair ticks at the cardinals, icon
 * centred. Drawn in SVG so the ticks sit exactly on the circle and the
 * whole thing scales cleanly.
 *
 * The outer ring turns a quarter rotation on hover of the parent
 * `.group` — a dial being set rather than a spinner.
 */
export function CategoryIcon({
  name,
  size = 56,
  tone = "light",
  className = "",
}: {
  name?: string;
  size?: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[name ?? ""] ?? Leaf;

  const ring = tone === "dark" ? "text-white/35" : "text-leaf/35";
  const tick = tone === "dark" ? "text-white/55" : "text-leaf/55";
  const fill = tone === "dark" ? "text-white" : "text-leaf";

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90"
        aria-hidden
      >
        <circle
          cx="50" cy="50" r="46"
          fill="none" stroke="currentColor" strokeWidth="2"
          className={ring}
        />
        {[0, 90, 180, 270].map((deg) => (
          <line
            key={deg}
            x1="50" y1="2" x2="50" y2="12"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            transform={`rotate(${deg} 50 50)`}
            className={tick}
          />
        ))}
        <circle
          cx="50" cy="50" r="34"
          fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeDasharray="3 5"
          className={ring}
        />
      </svg>

      <Icon
        className={`relative ${fill}`}
        style={{ width: size * 0.38, height: size * 0.38 }}
        strokeWidth={1.75}
      />
    </span>
  );
}

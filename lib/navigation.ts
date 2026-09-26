/**
 * Site navigation, in one place.
 *
 * This file is the temporary stand-in for the Sanity `navigation` singleton.
 * In Phase 5 the same shape gets pulled from the CMS so the client can add a
 * product category without touching code. Keep the shape identical so the
 * swap is a one-line change.
 *
 * Replace the product items below with the real 10-12 categories when you
 * have them — nothing else needs to change.
 */

export type NavLink = { title: string; href: string; blurb?: string };
export type NavColumn = { title: string; href: string; items: NavLink[] };

export const productMenu: NavColumn[] = [
  {
    title: "Crop Protection",
    href: "/products/crop-protection",
    items: [
      { title: "Insecticides", href: "/products/insecticides" },
      { title: "Fungicides", href: "/products/fungicides" },
      { title: "Herbicides", href: "/products/herbicides" },
      {
        title: "Plant Growth Regulators",
        href: "/products/plant-growth-regulators",
      },
    ],
  },
  {
    title: "Fertilizers",
    href: "/products/fertilizers",
    items: [
      { title: "Specialty Fertilizers", href: "/products/specialty-fertilizers" },
      {
        title: "Water-Soluble Fertilizers",
        href: "/products/water-soluble-fertilizers",
      },
      { title: "Micronutrients", href: "/products/micronutrients" },
    ],
  },
  {
    title: "Biostimulants",
    href: "/products/biostimulants",
    items: [
      { title: "Humic & Fulvic", href: "/products/humic-fulvic" },
      { title: "Amino Acid Based", href: "/products/amino-acid" },
      { title: "Seaweed Based", href: "/products/seaweed" },
      { title: "Specialty Biostimulants", href: "/products/specialty-biostimulants" },
    ],
  },
  {
    title: "Custom Solutions",
    href: "/capabilities/solutions",
    items: [
      { title: "Custom Formulation", href: "/capabilities/solutions#formulation" },
      { title: "Private Label", href: "/capabilities/solutions#private-label" },
      { title: "Bulk Supply", href: "/capabilities/solutions#bulk" },
      { title: "Contract Manufacturing", href: "/capabilities/solutions#contract" },
    ],
  },
];

export const capabilitiesMenu: NavLink[] = [
  {
    title: "Solutions",
    href: "/capabilities/solutions",
    blurb: "Contract manufacturing, private label, custom formulation",
  },
  {
    title: "Quality",
    href: "/capabilities/quality",
    blurb: "Our approach at every step of the product lifecycle",
  },
  {
    title: "Global Business",
    href: "/capabilities/global-business",
    blurb: "International markets and partnership opportunities",
  },
  {
    title: "Careers",
    href: "/careers",
    blurb: "Join the team building Synami",
  },
];

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Products", href: "/products", menu: "products" as const },
  { title: "Insights", href: "/capabilities", menu: "capabilities" as const },
  { title: "Contact Us", href: "/contact" },
];

export const footerContact = {
  email: "info@synamiagriscience.com",
  sales: "sales@synamiagriscience.com",
  export: "export@synamiagriscience.com",
  phone: "",
  address: "",
};

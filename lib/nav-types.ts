/**
 * The shape returned by productNavQuery.
 *
 * Header, BusinessSegments and Footer all consume this. One fetch in the
 * layout, passed down as props — so a new Main Category in Sanity shows up
 * everywhere at once with no code change.
 */

export type NavCategory = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
};

export type NavSegment = {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  categories: NavCategory[];
};

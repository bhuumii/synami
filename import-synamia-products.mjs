
import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const dryRun = process.env.DRY_RUN === "1";

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing project ID, dataset, or SANITY_API_TOKEN in .env.local"
  );
}

if (dataset !== "production") {
  throw new Error(`Expected production dataset, got: ${dataset}`);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-02-19",
  useCdn: false,
});

const products = JSON.parse(
  fs.readFileSync(
    new URL("./synamia_products_23-50_content.json", import.meta.url),
    "utf8"
  )
);

const categoryNames = {
  Insecticide: "Insecticides",
  Fungicide: "Fungicides",
  Herbicide: "Herbicides",
  "Plant Growth Regulator (PGR)": "Plant Growth Regulators (PGRs)",
  Biostimulant: "Biostimulants",
  Biofertilizer: "Bio Fertilizers",
  "Soil Conditioner": "Soil Conditioners",
};

const findCategory = `*[
  _type == "productCategory" &&
  lower(title) == lower($title)
][0]{_id, title}`;

const findDocument = `*[_id == $id][0]._id`;

console.log(`Dataset: ${dataset}`);
console.log(`Mode: ${dryRun ? "DRY RUN — no changes" : "LIVE IMPORT"}`);
console.log(`Products in file: ${products.length}`);

for (const item of products) {
  const { categoryTitle, ...doc } = item;
  const wantedCategory = categoryNames[categoryTitle] ?? categoryTitle;

  const category = await client.fetch(findCategory, {
    title: wantedCategory,
  });

  if (!category?._id) {
    throw new Error(
      `Category "${wantedCategory}" not found. Stopped before importing this product.`
    );
  }

  const existingId = await client.fetch(findDocument, {
    id: doc._id,
  });

  if (existingId) {
    console.log(`SKIP — ID already exists: ${doc.title}`);
    continue;
  }

  if (dryRun) {
    console.log(
      `READY — ${doc.brandName}: ${doc.title} → ${category.title}`
    );
    continue;
  }

  doc.category = {
    _type: "reference",
    _ref: category._id,
  };

  await client.create(doc);
  console.log(`CREATED — ${doc.brandName}: ${doc.title}`);
}

console.log(
  dryRun
    ? "Dry run finished. No documents were created."
    : "Import finished. Review the products in Sanity Studio."
);

// lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "cjwn5jgq", // Replace with your Sanity Project ID
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true, // Use CDN for faster reads
});

const builder = imageUrlBuilder(client);
export const urlFor = (source:SanityImageSource) => builder.image(source);
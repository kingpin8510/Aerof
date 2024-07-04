import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.SANITY_PROJECTID,
  dataset: "production",
  apiVersion: "2024-06-28",
  useCdn: true,
  token: process.env.SANITY_TOKENID,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

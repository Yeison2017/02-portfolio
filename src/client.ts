import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = sanityClient({
    // projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    projectId: "dghrf7hs",
    dataset: "production",
    apiVersion: "2022-12-07",
    useCdn: true,
    // token: process.env.REACT_APP_SANITY_TOKEN,
    token: "skVdQlEZTQt8Koz88RbT4u4nF6oB4YGMAXv6kNAfIK5jOHEjPlqj4j9tMr68j6NOeRivijzwgKRcbMaEtGVtqoiU8dVRcpVDPGK4UID0mejp5IIjWnbemaHcBZVudcTJpucEv3INwxmTsJ336lvmEWXD9E7YJ7QUQJvBSwlxJb7jXs16NMHw",
});

const builder = imageUrlBuilder(client);

type UrlFor = (source: SanityImageSource) => ImageUrlBuilder;

export const urlFor: UrlFor = (source) => builder.image(source);

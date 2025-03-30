import { defineQuery } from "groq";

export const getAllKitesQuery = defineQuery(
  `*[_type == 'kite'] { ..., image { ..., asset -> { url, metadata } } } | order(price asc)`,
);

export const getKiteBySlugQuery = defineQuery(
  `*[_type == 'kite' && slug.current == $slug] { ..., image { ..., asset-> { url, metadata } } }[0]`,
);

export const getAllRodsQuery = defineQuery(
  `*[_type == 'rod'] { ..., image { ..., asset-> { url, metadata } } } | order(name asc)`,
);

export const getAllReelsQuery = defineQuery(
  `*[_type == 'reel'] { ..., image { ..., asset-> { url, metadata } } } | order(name asc)`,
);

export const getAllTwinesQuery = defineQuery(
  `*[_type == 'twine'] { ..., image { ..., asset-> { url, metadata } } } | order(name asc)`,
);

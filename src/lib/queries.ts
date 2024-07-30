import { groq } from 'next-sanity';

export const getAllKitesQuery = groq`*[_type == 'kite'] { ..., image { asset -> { url, metadata } } } | order(price asc)`;

export const getKiteBySlugQuery = groq`*[_type == 'kite' && slug.current == $slug] { ..., image { asset-> { url, metadata } } }[0]`;

export const getAllRodsQuery = groq`*[_type == 'rod'] { ..., image { asset-> { url, metadata } } } | order(name asc)`;

export const getAllReelsQuery = groq`*[_type == 'reel'] { ..., image { asset-> { url, metadata } } } | order(name asc)`;

export const getAllTwinesQuery = groq`*[_type == 'twine'] { ..., image { asset-> { url, metadata } } } | order(name asc)`;

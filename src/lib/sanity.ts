import { groq } from 'next-sanity';
import { client } from '@sanity/lib/client';
import {
  GetAllKitesQueryResult,
  GetAllReelsQueryResult,
  GetAllRodsQueryResult,
  GetAllTwinesQueryResult,
  GetKiteBySlugQueryResult,
} from '@sanity/lib/sanity.types';

export async function getAllKites(): Promise<GetAllKitesQueryResult> {
  const getAllKitesQuery = groq`*[_type == "kite"] { ..., image { asset -> { url, metadata } } }`;
  return await client.fetch<GetAllKitesQueryResult>(getAllKitesQuery);
}

export async function getKiteBySlug(
  slug: string,
): Promise<GetKiteBySlugQueryResult> {
  const getKiteBySlugQuery = groq`*[_type == "kite" && slug.current == $slug] { ..., image { asset-> { url, metadata } } }[0]`;
  return await client.fetch<GetKiteBySlugQueryResult>(getKiteBySlugQuery, {
    slug,
  });
}

export async function getAllRods() {
  const getAllRodsQuery = groq`*[_type == "rod"] { ..., image { asset-> { url, metadata } } }`;

  return await client.fetch<GetAllRodsQueryResult>(getAllRodsQuery);
}

export async function getAllReels(): Promise<GetAllReelsQueryResult> {
  const getAllReelsQuery = groq`*[_type == "reel"] { ..., image { asset-> { url, metadata } } }`;

  return await client.fetch(getAllReelsQuery);
}

export async function getAllTwines(): Promise<GetAllTwinesQueryResult> {
  const getAllTwinesQuery = groq`*[_type == "twine"] { ..., image { asset-> { url, metadata } } }`;

  return await client.fetch(getAllTwinesQuery);
}

import { client } from '@sanity/lib/client';
import {
  GetAllKitesQueryResult,
  GetAllReelsQueryResult,
  GetAllRodsQueryResult,
  GetAllTwinesQueryResult,
  GetKiteBySlugQueryResult,
} from '@sanity/lib/sanity.types';
import {
  getAllKitesQuery,
  getKiteBySlugQuery,
  getAllRodsQuery,
  getAllReelsQuery,
  getAllTwinesQuery,
} from './queries';

export async function getAllKites(): Promise<GetAllKitesQueryResult> {
  return await client.fetch<GetAllKitesQueryResult>(getAllKitesQuery);
}

export async function getKiteBySlug(
  slug: string,
): Promise<GetKiteBySlugQueryResult> {
  return await client.fetch<GetKiteBySlugQueryResult, { slug: string }>(
    getKiteBySlugQuery,
    {
      slug,
    },
  );
}

export async function getAllRods() {
  return await client.fetch<GetAllRodsQueryResult>(getAllRodsQuery);
}

export async function getAllReels(): Promise<GetAllReelsQueryResult> {
  return await client.fetch(getAllReelsQuery);
}

export async function getAllTwines(): Promise<GetAllTwinesQueryResult> {
  return await client.fetch(getAllTwinesQuery);
}

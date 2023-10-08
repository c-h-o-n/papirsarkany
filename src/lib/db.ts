import { Prisma } from '@prisma/client';
import prisma from './prisma';
import { Kite, Rods } from './types';

export async function getKites(args?: Omit<Prisma.ProductsFindManyArgs, 'where'>): Promise<Kite[]> {
  return (await prisma.products.findMany({
    where: {
      category: 'Egyzsinoros',
    },
    ...args,
  })) as Kite[];
}

export async function getKitebySlug(slug: string): Promise<Kite> {
  return (await prisma.products.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  })) as Kite;
}

export async function getRods(args?: Omit<Prisma.ProductsFindManyArgs, 'where'>): Promise<Rods[]> {
  return (await prisma.products.findMany({
    where: {
      category: 'PalcakRudak',
    },
    ...args,
  })) as Rods[];
}

import { Products } from '@prisma/client';
import prisma from './prisma';

export type Kite = Products & {
  properties: {
    isBeginner: true
  }
} 

export async function getKites(): Promise<Kite[]> {
  return await prisma.products.findMany({
    where: {
      category: 'Egyzsinoros',
    },
    orderBy: {
      price: 'asc',
    },
  }) as Kite[];
}

export async function getKitebySlug(slug:string): Promise<Kite> {
  return await prisma.products.findFirst({
    where: {
      slug: {
        equals: slug
      }
    }
  }) as Kite
}
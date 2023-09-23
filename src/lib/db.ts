import prisma from './prisma';

export async function getKites() {
  return await prisma.products.findMany({
    where: {
      category: 'Egyzsinoros',
    },
    orderBy: {
      price: 'asc',
    },
  });
}

export async function getKitebySlug(slug:string) {
  return await prisma.products.findFirst({
    where: {
      slug: {
        equals: slug
      }
    }
  })
}
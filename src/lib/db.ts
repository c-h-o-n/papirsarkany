import { Prisma } from '@prisma/client';
import prisma from './prisma';
import {
  CartItem,
  FormSchemaObject,
  Kite,
  Reel,
  Rod,
  Tube,
  Twine,
} from './types';
import { prismaPaymentModemMap, prismaShippingModeMap } from './formatters';

export async function createOrder(
  orderForm: FormSchemaObject,
  products: CartItem[],
) {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.customers.upsert({
      where: {
        email: orderForm.email!,
      },
      update: {
        email: orderForm.email!,
        firstName: orderForm.firstName!,
        lastName: orderForm.lastName!,
        phone: orderForm.phoneNumber!,
        shippingPostcode: orderForm.shippingPostcode!,
        shippingCity: orderForm.shippingCity!,
        shippingAddress: orderForm.shippingAddress!,
        shippingSubaddress: orderForm.shippingSubaddress!,
        billingPostcode: orderForm.billingPostcode!,
        billingCity: orderForm.billingCity!,
        billingAddress: orderForm.billingAddress!,
        billingSubaddress: orderForm.billingSubaddress!,
      },
      create: {
        email: orderForm.email!,
        firstName: orderForm.firstName!,
        lastName: orderForm.lastName!,
        phone: orderForm.phoneNumber!,
        shippingPostcode: orderForm.shippingPostcode!,
        shippingCity: orderForm.shippingCity!,
        shippingAddress: orderForm.shippingAddress!,
        shippingSubaddress: orderForm.shippingSubaddress!,
        billingPostcode: orderForm.billingPostcode!,
        billingCity: orderForm.billingCity!,
        billingAddress: orderForm.billingAddress!,
        billingSubaddress: orderForm.billingSubaddress!,
      },
    });

    const order = await tx.orders.create({
      data: {
        customerId: user.id,
        status: 'Pending',
        shippingMode: prismaShippingModeMap[orderForm.shippingOption!],
        paymentMode: prismaPaymentModemMap[orderForm.paymentOption!],
        comment: orderForm.comment!,

        createdAt: new Date(),
      },
    });

    const orderItemsToCreate: Prisma.OrderItemsUncheckedCreateInput[] = [];
    for (const product of products) {
      orderItemsToCreate.push({
        productId: product.id,
        orderId: order.id,
        quantity: product.quantity,
      });
    }

    await tx.orderItems.createMany({
      data: orderItemsToCreate,
    });

    return order;
  });
}

export async function getKites(
  args?: Omit<Prisma.ProductsFindManyArgs, 'where'>,
): Promise<Kite[]> {
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

export async function getRods(
  args?: Omit<Prisma.ProductsFindManyArgs, 'where'>,
): Promise<Rod[] | undefined> {
  return (await prisma.products.findMany({
    where: {
      category: 'PalcakRudak',
    },
    ...args,
  })) as Rod[] | undefined;
}

export async function getReels(
  args?: Omit<Prisma.ProductsFindManyArgs, 'where'>,
): Promise<Reel[] | undefined> {
  return (await prisma.products.findMany({
    where: {
      category: 'Zsinortartok',
    },
    ...args,
  })) as Reel[] | undefined;
}

export async function getTubes(
  args?: Omit<Prisma.ProductsFindManyArgs, 'where'>,
): Promise<Tube[] | undefined> {
  return (await prisma.products.findMany({
    where: {
      category: 'Csovek',
    },
    ...args,
  })) as Tube[] | undefined;
}

export async function getTwines(
  args?: Omit<Prisma.ProductsFindManyArgs, 'where'>,
): Promise<Twine[] | undefined> {
  return (await prisma.products.findMany({
    where: {
      category: 'Zsinorok',
    },
    ...args,
  })) as Twine[] | undefined;
}

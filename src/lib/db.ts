import { Prisma } from '@prisma/client';
import prisma from './prisma';
import { CartItem, FormSchemaObject } from './types';
import { prismaPaymentModemMap, prismaShippingModeMap } from './formatters';

export async function createOrder(
  orderForm: FormSchemaObject,
  products: CartItem[],
) {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.customer.upsert({
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

    const order = await tx.order.create({
      data: {
        customerId: user.id,
        status: 'Pending',
        shippingMode: prismaShippingModeMap[orderForm.shippingOption!],
        paymentMode: prismaPaymentModemMap[orderForm.paymentOption!],
        comment: orderForm.comment!,

        createdAt: new Date(),
      },
    });

    const orderItemsToCreate: Prisma.OrderItemUncheckedCreateInput[] = [];
    for (const product of products) {
      orderItemsToCreate.push({
        productId: product._id,
        orderId: order.id,
        quantity: product.quantity,
      });
    }

    await tx.orderItem.createMany({
      data: orderItemsToCreate,
    });

    return order;
  });
}

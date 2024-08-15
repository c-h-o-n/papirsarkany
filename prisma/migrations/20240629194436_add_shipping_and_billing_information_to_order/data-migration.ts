import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    const customers = await tx.customer.findMany();

    for (const customer of customers) {
      await tx.order.updateMany({
        where: {
          customerId: customer.id,
        },
        data: {
          shippingPostcode: customer.shippingPostcode,
          shippingCity: customer.shippingCity,
          shippingAddress: customer.shippingAddress,
          shippingSubaddress: customer.shippingSubaddress,
          billingPostcode: customer.billingPostcode,
          billingCity: customer.billingCity,
          billingAddress: customer.billingAddress,
          billingSubaddress: customer.billingSubaddress,
        },
      });

      console.log(`Updated orders for customer ID ${customer.id}`);
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

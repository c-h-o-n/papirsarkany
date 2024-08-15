/*
  Warnings:

  - Added the required column `billingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingCity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingPostcode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer"
ALTER COLUMN "shippingPostcode" DROP NOT NULL,
ALTER COLUMN "shippingCity" DROP NOT NULL,
ALTER COLUMN "shippingAddress" DROP NOT NULL,
ALTER COLUMN "shippingSubaddress" DROP NOT NULL,
ALTER COLUMN "billingSubaddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order"
ADD COLUMN     "billingAddress" TEXT,
ADD COLUMN     "billingCity" TEXT,
ADD COLUMN     "billingPostcode" TEXT,
ADD COLUMN     "billingSubaddress" TEXT,
ADD COLUMN     "shippingAddress" TEXT,
ADD COLUMN     "shippingCity" TEXT,
ADD COLUMN     "shippingPostcode" TEXT,
ADD COLUMN     "shippingSubaddress" TEXT;

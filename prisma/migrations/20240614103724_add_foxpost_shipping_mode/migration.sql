-- AlterEnum
ALTER TYPE "ShippingMode" ADD VALUE 'Foxpost automatába';

-- AlterTable
ALTER TABLE "Customer" RENAME CONSTRAINT "Customers_pkey" TO "Customer_pkey";

-- AlterTable
ALTER TABLE "Order" RENAME CONSTRAINT "Orders_pkey" TO "Order_pkey";

-- AlterTable
ALTER TABLE "OrderItem" RENAME CONSTRAINT "OrderItems_pkey" TO "OrderItem_pkey";

-- RenameForeignKey
ALTER TABLE "Order" RENAME CONSTRAINT "Orders_customerId_fkey" TO "Order_customerId_fkey";

-- RenameForeignKey
ALTER TABLE "OrderItem" RENAME CONSTRAINT "OrderItems_orderId_fkey" TO "OrderItem_orderId_fkey";

-- RenameIndex
ALTER INDEX "Customers_email_key" RENAME TO "Customer_email_key";

-- RenameIndex
ALTER INDEX "Orders_customerId_idx" RENAME TO "Order_customerId_idx";

-- RenameIndex
ALTER INDEX "OrderItems_orderId_idx" RENAME TO "OrderItem_orderId_idx";

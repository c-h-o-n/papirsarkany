/*
  Warnings:

  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_productId_fkey";

-- DropIndex
DROP INDEX "OrderItems_productId_idx";

-- DropTable
DROP TABLE "Products";

-- DropEnum
DROP TYPE "Category";

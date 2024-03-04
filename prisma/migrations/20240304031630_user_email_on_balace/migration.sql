/*
  Warnings:

  - You are about to drop the column `userId` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `transactions` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `balanceId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `balances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "balances" DROP CONSTRAINT "balances_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- DropIndex
DROP INDEX "balances_userId_key";

-- AlterTable
ALTER TABLE "balances" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "balanceId",
DROP COLUMN "id",
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("email");

-- CreateIndex
CREATE UNIQUE INDEX "balances_userEmail_key" ON "balances"("userEmail");

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

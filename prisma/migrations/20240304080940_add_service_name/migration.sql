/*
  Warnings:

  - Added the required column `service_name` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "service_name" TEXT NOT NULL;

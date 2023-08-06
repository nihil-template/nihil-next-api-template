/*
  Warnings:

  - You are about to drop the column `accessExp` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "accessExp",
DROP COLUMN "accessToken";

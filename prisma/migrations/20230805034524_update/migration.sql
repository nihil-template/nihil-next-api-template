/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email,userName]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `userName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('avtive', 'inactive', 'withdrawal');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropIndex
DROP INDEX "user_email_key";

-- DropIndex
DROP INDEX "user_userName_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "emailVerified",
DROP COLUMN "image",
ADD COLUMN     "accessExp" INTEGER,
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'user',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'avtive',
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userName" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "verification_token";

-- CreateTable
CREATE TABLE "user_auth" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "user_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdrawal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "text" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_auth_user_id_fk" ON "user_auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_userId_key" ON "user_auth"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "withdrawal_userId_key" ON "withdrawal"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_userName_key" ON "user"("email", "userName");

-- AddForeignKey
ALTER TABLE "user_auth" ADD CONSTRAINT "user_auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdrawal" ADD CONSTRAINT "withdrawal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

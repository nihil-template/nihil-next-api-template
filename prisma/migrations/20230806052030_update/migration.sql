/*
  Warnings:

  - The values [avtive] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `hashedPassword` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `refreshExp` on the `user_auth` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `user_auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserStatus_new" AS ENUM ('active', 'inactive', 'withdrawal');
ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "status" TYPE "UserStatus_new" USING ("status"::text::"UserStatus_new");
ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "UserStatus_old";
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "hashedPassword",
ALTER COLUMN "status" SET DEFAULT 'active';

-- AlterTable
ALTER TABLE "user_auth" DROP COLUMN "refreshExp",
ADD COLUMN     "hashedPassword" TEXT NOT NULL;

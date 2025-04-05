/*
  Warnings:

  - You are about to drop the column `marketCapDelta` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `mediaContentUri` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `transfers` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `coinId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userAvatarUrl` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userHandle` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `CreatorEarning` table. All the data in the column will be lost.
  - You are about to drop the column `userAvatarUrl` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `userHandle` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the `Creator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Coin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coinAddress` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CreatorEarning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_creatorAddress_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_coinId_fkey";

-- DropForeignKey
ALTER TABLE "CreatorEarning" DROP CONSTRAINT "CreatorEarning_creatorId_fkey";

-- DropIndex
DROP INDEX "Comment_coinId_idx";

-- DropIndex
DROP INDEX "CreatorEarning_creatorId_idx";

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "marketCapDelta",
DROP COLUMN "mediaContentUri",
DROP COLUMN "transfers",
ADD COLUMN     "marketCapDelta24h" TEXT,
ADD COLUMN     "mediaOriginalUri" TEXT,
ADD COLUMN     "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transferCount" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "totalSupply" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "coinId",
DROP COLUMN "userAvatarUrl",
DROP COLUMN "userHandle",
ADD COLUMN     "coinAddress" TEXT NOT NULL,
ADD COLUMN     "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CreatorEarning" DROP COLUMN "creatorId",
ADD COLUMN     "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "userAvatarUrl",
DROP COLUMN "userHandle",
ADD COLUMN     "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Creator";

-- CreateTable
CREATE TABLE "Profile" (
    "address" TEXT NOT NULL,
    "handle" TEXT,
    "avatarUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "CoinBalance" (
    "id" TEXT NOT NULL,
    "profileAddress" TEXT NOT NULL,
    "coinAddress" TEXT NOT NULL,
    "amountUsd" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CoinBalance_profileAddress_idx" ON "CoinBalance"("profileAddress");

-- CreateIndex
CREATE UNIQUE INDEX "CoinBalance_profileAddress_coinAddress_key" ON "CoinBalance"("profileAddress", "coinAddress");

-- CreateIndex
CREATE INDEX "Comment_coinAddress_idx" ON "Comment"("coinAddress");

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_creatorAddress_fkey" FOREIGN KEY ("creatorAddress") REFERENCES "Profile"("address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_coinAddress_fkey" FOREIGN KEY ("coinAddress") REFERENCES "Coin"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "Profile"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "Profile"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinBalance" ADD CONSTRAINT "CoinBalance_profileAddress_fkey" FOREIGN KEY ("profileAddress") REFERENCES "Profile"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

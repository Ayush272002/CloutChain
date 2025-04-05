/*
  Warnings:

  - You are about to drop the column `creatorAvatar` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorEarnings` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorHandle` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorTotalUsd` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `marketCapDelta24h` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUri` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `previewImageUrl` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[address]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Coin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAddress` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAddress` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_authorId_fkey";

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "creatorAvatar",
DROP COLUMN "creatorEarnings",
DROP COLUMN "creatorHandle",
DROP COLUMN "creatorTotalUsd",
DROP COLUMN "marketCapDelta24h",
DROP COLUMN "mediaUri",
DROP COLUMN "previewImageUrl",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "marketCapDelta" TEXT,
ADD COLUMN     "mediaContentUri" TEXT,
ADD COLUMN     "mediaPreviewUrl" TEXT,
ALTER COLUMN "uniqueHolders" DROP NOT NULL,
ALTER COLUMN "totalSupply" SET DATA TYPE TEXT,
ALTER COLUMN "totalVolume" DROP NOT NULL,
ALTER COLUMN "totalVolume" SET DATA TYPE TEXT,
ALTER COLUMN "volume24h" DROP NOT NULL,
ALTER COLUMN "volume24h" SET DATA TYPE TEXT,
ALTER COLUMN "marketCap" DROP NOT NULL,
ALTER COLUMN "marketCap" SET DATA TYPE TEXT,
ALTER COLUMN "transfers" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "text",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userAddress" TEXT NOT NULL,
ADD COLUMN     "userAvatarUrl" TEXT,
ADD COLUMN     "userHandle" TEXT;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "text",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userAddress" TEXT NOT NULL,
ADD COLUMN     "userAvatarUrl" TEXT,
ADD COLUMN     "userHandle" TEXT;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "handle" TEXT,
    "avatarUrl" TEXT,
    "totalBalanceUsd" TEXT,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatorEarning" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "amountUsd" TEXT NOT NULL,

    CONSTRAINT "CreatorEarning_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_address_key" ON "Creator"("address");

-- CreateIndex
CREATE INDEX "CreatorEarning_coinId_idx" ON "CreatorEarning"("coinId");

-- CreateIndex
CREATE INDEX "CreatorEarning_creatorId_idx" ON "CreatorEarning"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_address_key" ON "Coin"("address");

-- CreateIndex
CREATE INDEX "Coin_creatorAddress_idx" ON "Coin"("creatorAddress");

-- CreateIndex
CREATE INDEX "Comment_coinId_idx" ON "Comment"("coinId");

-- CreateIndex
CREATE INDEX "Comment_userAddress_idx" ON "Comment"("userAddress");

-- CreateIndex
CREATE INDEX "Reply_commentId_idx" ON "Reply"("commentId");

-- CreateIndex
CREATE INDEX "Reply_userAddress_idx" ON "Reply"("userAddress");

-- AddForeignKey
ALTER TABLE "Coin" ADD CONSTRAINT "Coin_creatorAddress_fkey" FOREIGN KEY ("creatorAddress") REFERENCES "Creator"("address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatorEarning" ADD CONSTRAINT "CreatorEarning_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreatorEarning" ADD CONSTRAINT "CreatorEarning_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

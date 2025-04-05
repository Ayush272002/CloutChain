/*
  Warnings:

  - You are about to drop the column `avatarBlurhash` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `avatarPreviewUrl` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `avatarSmallUrl` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `blurhash` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorEarnings` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorProfileAvatarBlurhash` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorProfileAvatarUrl` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorProfileHandle` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorProfileId` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `handle` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `mediumImageUrl` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `originalImageUrl` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `previewImageUrl` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `transferCount` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Coin` table. All the data in the column will be lost.
  - The `totalSupply` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalVolume` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `volume24h` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `marketCap` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `marketCapDelta24h` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `CoinComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PriceHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScrapeMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoinComment" DROP CONSTRAINT "CoinComment_coinId_fkey";

-- DropForeignKey
ALTER TABLE "PriceHistory" DROP CONSTRAINT "PriceHistory_coinId_fkey";

-- DropIndex
DROP INDEX "Coin_chainId_idx";

-- DropIndex
DROP INDEX "Coin_createdAt_idx";

-- DropIndex
DROP INDEX "Coin_creatorProfileHandle_idx";

-- DropIndex
DROP INDEX "Coin_marketCap_idx";

-- DropIndex
DROP INDEX "Coin_uniqueHolders_idx";

-- DropIndex
DROP INDEX "Coin_volume24h_idx";

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "avatarBlurhash",
DROP COLUMN "avatarPreviewUrl",
DROP COLUMN "avatarSmallUrl",
DROP COLUMN "blurhash",
DROP COLUMN "chainId",
DROP COLUMN "creatorEarnings",
DROP COLUMN "creatorProfileAvatarBlurhash",
DROP COLUMN "creatorProfileAvatarUrl",
DROP COLUMN "creatorProfileHandle",
DROP COLUMN "creatorProfileId",
DROP COLUMN "handle",
DROP COLUMN "mediumImageUrl",
DROP COLUMN "mimeType",
DROP COLUMN "originalImageUrl",
DROP COLUMN "previewImageUrl",
DROP COLUMN "transferCount",
DROP COLUMN "updatedAt",
ADD COLUMN     "creatorAvatar" TEXT,
ADD COLUMN     "creatorBalanceUsd" TEXT,
ADD COLUMN     "creatorHandle" TEXT,
ADD COLUMN     "mediaMimeType" TEXT,
ADD COLUMN     "mediaPreviewUrl" TEXT,
ADD COLUMN     "mediaUri" TEXT,
ADD COLUMN     "transfersCount" INTEGER,
DROP COLUMN "totalSupply",
ADD COLUMN     "totalSupply" DOUBLE PRECISION,
DROP COLUMN "totalVolume",
ADD COLUMN     "totalVolume" DOUBLE PRECISION,
DROP COLUMN "volume24h",
ADD COLUMN     "volume24h" DOUBLE PRECISION,
DROP COLUMN "marketCap",
ADD COLUMN     "marketCap" DOUBLE PRECISION,
DROP COLUMN "marketCapDelta24h",
ADD COLUMN     "marketCapDelta24h" DOUBLE PRECISION;

-- DropTable
DROP TABLE "CoinComment";

-- DropTable
DROP TABLE "PriceHistory";

-- DropTable
DROP TABLE "ScrapeMetadata";

-- CreateTable
CREATE TABLE "Earnings" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "amountUsd" TEXT NOT NULL,

    CONSTRAINT "Earnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "txHash" TEXT,
    "comment" TEXT,
    "userAddress" TEXT,
    "userHandle" TEXT,
    "userAvatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "userAddress" TEXT NOT NULL,
    "reply" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Earnings" ADD CONSTRAINT "Earnings_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `address` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `creatorBalanceUsd` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `mediaPreviewUrl` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `transfersCount` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userAddress` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userAvatar` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userHandle` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `reply` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `userAddress` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the `Earnings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[txHash]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transfers` to the `Coin` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `symbol` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uniqueHolders` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalSupply` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalVolume` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `volume24h` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `marketCap` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `marketCapDelta24h` on table `Coin` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `txHash` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `authorId` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Earnings" DROP CONSTRAINT "Earnings_coinId_fkey";

-- DropIndex
DROP INDEX "Coin_address_key";

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "address",
DROP COLUMN "creatorBalanceUsd",
DROP COLUMN "mediaPreviewUrl",
DROP COLUMN "transfersCount",
ADD COLUMN     "creatorEarnings" DOUBLE PRECISION,
ADD COLUMN     "creatorTotalUsd" DOUBLE PRECISION,
ADD COLUMN     "previewImageUrl" TEXT,
ADD COLUMN     "transfers" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "symbol" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "uniqueHolders" SET NOT NULL,
ALTER COLUMN "totalSupply" SET NOT NULL,
ALTER COLUMN "totalVolume" SET NOT NULL,
ALTER COLUMN "volume24h" SET NOT NULL,
ALTER COLUMN "marketCap" SET NOT NULL,
ALTER COLUMN "marketCapDelta24h" SET NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "comment",
DROP COLUMN "userAddress",
DROP COLUMN "userAvatar",
DROP COLUMN "userHandle",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ALTER COLUMN "txHash" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "reply",
DROP COLUMN "userAddress",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- DropTable
DROP TABLE "Earnings";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "handle" TEXT,
    "avatarUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_txHash_key" ON "Comment"("txHash");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

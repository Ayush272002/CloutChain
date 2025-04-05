-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT,
    "symbol" TEXT,
    "description" TEXT,
    "totalSupply" TEXT,
    "totalVolume" TEXT,
    "volume24h" TEXT,
    "marketCap" TEXT,
    "marketCapDelta24h" TEXT,
    "chainId" INTEGER NOT NULL DEFAULT 8453,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorAddress" TEXT,
    "creatorProfileId" TEXT,
    "creatorProfileHandle" TEXT,
    "creatorProfileAvatarUrl" TEXT,
    "creatorProfileAvatarBlurhash" TEXT,
    "handle" TEXT,
    "uniqueHolders" INTEGER,
    "transferCount" INTEGER,
    "previewImageUrl" TEXT,
    "originalImageUrl" TEXT,
    "mediumImageUrl" TEXT,
    "blurhash" TEXT,
    "mimeType" TEXT,
    "avatarPreviewUrl" TEXT,
    "avatarSmallUrl" TEXT,
    "avatarBlurhash" TEXT,
    "creatorEarnings" TEXT,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "price" TEXT NOT NULL,
    "marketCap" TEXT,
    "volume" TEXT,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinComment" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorAddress" TEXT,
    "authorHandle" TEXT,
    "authorDisplayName" TEXT,
    "authorProfileImage" TEXT,
    "reactions" TEXT,

    CONSTRAINT "CoinComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScrapeMetadata" (
    "id" TEXT NOT NULL DEFAULT 'scrape-metadata',
    "lastScrapeTime" TIMESTAMP(3) NOT NULL,
    "totalCoins" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScrapeMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coin_address_key" ON "Coin"("address");

-- CreateIndex
CREATE INDEX "Coin_marketCap_idx" ON "Coin"("marketCap");

-- CreateIndex
CREATE INDEX "Coin_volume24h_idx" ON "Coin"("volume24h");

-- CreateIndex
CREATE INDEX "Coin_createdAt_idx" ON "Coin"("createdAt");

-- CreateIndex
CREATE INDEX "Coin_chainId_idx" ON "Coin"("chainId");

-- CreateIndex
CREATE INDEX "Coin_uniqueHolders_idx" ON "Coin"("uniqueHolders");

-- CreateIndex
CREATE INDEX "Coin_creatorProfileHandle_idx" ON "Coin"("creatorProfileHandle");

-- CreateIndex
CREATE INDEX "PriceHistory_coinId_timestamp_idx" ON "PriceHistory"("coinId", "timestamp");

-- CreateIndex
CREATE INDEX "CoinComment_coinId_createdAt_idx" ON "CoinComment"("coinId", "createdAt");

-- CreateIndex
CREATE INDEX "CoinComment_authorAddress_idx" ON "CoinComment"("authorAddress");

-- CreateIndex
CREATE INDEX "CoinComment_authorHandle_idx" ON "CoinComment"("authorHandle");

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinComment" ADD CONSTRAINT "CoinComment_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

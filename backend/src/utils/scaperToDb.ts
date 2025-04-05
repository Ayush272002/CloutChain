import {
  getCoinsMostValuable,
  getCoinComments,
  getProfileBalances,
  setApiKey,
} from "@zoralabs/coins-sdk";
import { Address } from "viem";
import { PrismaClient } from "@prisma/client";

setApiKey(process.env.ZORA_API_KEY || "");

const prisma = new PrismaClient();

interface CoinNode {
  address: string;
  name: string;
  symbol: string;
  description?: string;
  totalSupply?: string;
  totalVolume?: string;
  volume24h?: string;
  marketCap?: string;
  marketCapDelta24h?: string;
  createdAt: number | string;
  creatorAddress?: string;
  uniqueHolders?: number;
  transfers?: { count?: number };
  mediaContent?: {
    mimeType?: string;
    originalUri?: string;
    previewImage?: {
      small?: string;
    };
  };
  creatorProfile?: {
    handle?: string;
    avatar?: {
      previewImage?: {
        small?: string;
      };
    };
  };
  creatorEarnings?: Array<{
    amountUsd?: string;
  }>;
}

interface CommentNode {
  txHash: string;
  comment: string;
  timestamp: number;
  userAddress: string;
  userProfile?: {
    handle?: string;
    avatar?: {
      previewImage?: {
        small?: string;
      };
    };
  };
  replies?: {
    edges: Array<{
      node: ReplyNode;
    }>;
  };
}

interface ReplyNode {
  comment: string;
  timestamp: number;
  userAddress: string;
  userProfile?: {
    handle?: string;
  };
}

interface BalanceNode {
  coin?: {
    address: string;
    creatorEarnings?: Array<{
      amountUsd?: string;
    }>;
  };
}

async function fetchAndSaveCreatorTotalBalance(creatorAddress: string) {
  try {
    const response = await getProfileBalances({
      identifier: creatorAddress,
      count: 10000,
    });

    //   @ts-ignore
    const balances = response?.data?.profile?.coinBalances?.edges || [];
    let totalBalanceUsd = 0;

    await prisma.profile.upsert({
      where: { address: creatorAddress },
      update: {},
      create: { address: creatorAddress },
    });

    for (const balance of balances) {
      const balanceNode = balance.node as BalanceNode | undefined;
      const coinAddress = balanceNode?.coin?.address;

      if (coinAddress) {
        let amountUsd = "0";
        const earnings = balanceNode?.coin?.creatorEarnings;
        if (earnings && earnings.length > 0) {
          for (const earning of earnings) {
            totalBalanceUsd += parseFloat(earning.amountUsd || "0");
            amountUsd = earning.amountUsd || "0";
          }
        }

        await prisma.coinBalance.upsert({
          where: {
            profileAddress_coinAddress: {
              profileAddress: creatorAddress,
              coinAddress: coinAddress,
            },
          },
          update: {
            amountUsd,
          },
          create: {
            profileAddress: creatorAddress,
            coinAddress,
            amountUsd,
          },
        });
      }
    }

    return totalBalanceUsd.toFixed(2);
  } catch (error) {
    console.error("Error fetching creator balances:", error);
    return "N/A";
  }
}

async function fetchAndSaveCoinComments(coinAddress: Address, after?: string) {
  try {
    const existingCoin = await prisma.coin.findUnique({
      where: { address: coinAddress },
    });

    if (!existingCoin) {
      console.log(
        `Coin ${coinAddress} not found in database. Skipping comments.`
      );
      return;
    }

    const response = await getCoinComments({
      address: coinAddress,
      chain: 8453,
      after,
      count: 10000,
    });

    console.log(`Fetched comments for coin: ${coinAddress}`);

    const comments = response.data?.zora20Token?.zoraComments?.edges || [];
    const nextPageCursor =
      response.data?.zora20Token?.zoraComments?.pageInfo?.endCursor;

    for (const edge of comments) {
      const commentData = edge.node as CommentNode | undefined;
      if (!commentData || !commentData.txHash) continue;

      const userAddress = commentData.userAddress;
      const userProfile = commentData.userProfile;

      await prisma.profile.upsert({
        where: { address: userAddress },
        update: {
          handle: userProfile?.handle || null,
          avatarUrl: userProfile?.avatar?.previewImage?.small || null,
        },
        create: {
          address: userAddress,
          handle: userProfile?.handle || null,
          avatarUrl: userProfile?.avatar?.previewImage?.small || null,
        },
      });

      const commentTimestamp = new Date(commentData.timestamp * 1000);
      const savedComment = await prisma.comment.upsert({
        where: { txHash: commentData.txHash },
        update: {
          comment: commentData.comment,
          timestamp: commentTimestamp,
          userAddress,
          coinAddress,
        },
        create: {
          txHash: commentData.txHash,
          comment: commentData.comment,
          timestamp: commentTimestamp,
          userAddress,
          coinAddress,
        },
      });

      const replies = commentData.replies?.edges || [];
      if (replies) {
        for (const reply of replies) {
          const replyData = reply.node;
          if (!replyData) continue;

          await prisma.profile.upsert({
            where: { address: replyData.userAddress },
            update: {},
            create: { address: replyData.userAddress },
          });

          const replyTimestamp = new Date(replyData.timestamp * 1000);
          await prisma.reply.create({
            data: {
              comment: replyData.comment,
              timestamp: replyTimestamp,
              commentId: savedComment.id,
              userAddress: replyData.userAddress,
            },
          });
        }
      }

      console.log(`Saved comment: ${commentData.txHash}`);
    }

    if (nextPageCursor) {
      console.log("Fetching next page of comments...");
      await fetchAndSaveCoinComments(coinAddress, nextPageCursor);
    }
  } catch (error) {
    console.error(`Error fetching comments for ${coinAddress}:`, error);
  }
}

async function fetchAndSaveCoinDetails(coinAddress: Address) {
  try {
    const response = await getCoinsMostValuable({
      count: 10000,
    });

    //   @ts-ignore
    const coinEdge = response.data?.exploreList?.edges.find(
      (coin: any) => coin.node?.address === coinAddress
    );

    const coin = coinEdge?.node as CoinNode | undefined;

    if (coin) {
      const creatorAddress = coin.creatorAddress;
      const totalCreatorBalance = creatorAddress
        ? await fetchAndSaveCreatorTotalBalance(creatorAddress)
        : "N/A";

      if (creatorAddress) {
        await prisma.profile.upsert({
          where: { address: creatorAddress },
          update: {
            handle: coin.creatorProfile?.handle || null,
            avatarUrl: coin.creatorProfile?.avatar?.previewImage?.small || null,
          },
          create: {
            address: creatorAddress,
            handle: coin.creatorProfile?.handle || null,
            avatarUrl: coin.creatorProfile?.avatar?.previewImage?.small || null,
          },
        });
      }

      const savedCoin = await prisma.coin.upsert({
        where: { address: coinAddress },
        update: {
          name: coin.name,
          symbol: coin.symbol,
          description: coin.description || null,
          totalSupply: coin.totalSupply || null,
          totalVolume: coin.totalVolume || null,
          volume24h: coin.volume24h || null,
          marketCap: coin.marketCap || null,
          marketCapDelta24h: coin.marketCapDelta24h || null,
          createdAt:
            typeof coin.createdAt === "number"
              ? new Date(coin.createdAt * 1000)
              : new Date(coin.createdAt),
          creatorAddress: creatorAddress || null,
          uniqueHolders: coin.uniqueHolders || null,
          transferCount: coin.transfers?.count || null,
          mediaMimeType: coin.mediaContent?.mimeType || null,
          mediaOriginalUri: coin.mediaContent?.originalUri || null,
          mediaPreviewUrl: coin.mediaContent?.previewImage?.small || null,
        },
        create: {
          address: coinAddress,
          name: coin.name,
          symbol: coin.symbol,
          description: coin.description || null,
          totalSupply: coin.totalSupply || null,
          totalVolume: coin.totalVolume || null,
          volume24h: coin.volume24h || null,
          marketCap: coin.marketCap || null,
          marketCapDelta24h: coin.marketCapDelta24h || null,
          createdAt:
            typeof coin.createdAt === "number"
              ? new Date(coin.createdAt * 1000)
              : new Date(coin.createdAt),
          creatorAddress: creatorAddress || null,
          uniqueHolders: coin.uniqueHolders || null,
          transferCount: coin.transfers?.count || null,
          mediaMimeType: coin.mediaContent?.mimeType || null,
          mediaOriginalUri: coin.mediaContent?.originalUri || null,
          mediaPreviewUrl: coin.mediaContent?.previewImage?.small || null,
        },
      });

      if (coin.creatorEarnings && coin.creatorEarnings.length > 0) {
        for (const earning of coin.creatorEarnings) {
          await prisma.creatorEarning.create({
            data: {
              amountUsd: earning.amountUsd || "0",
              coinId: savedCoin.id,
            },
          });
        }
      }

      console.log(`Saved coin: ${coinAddress}`);
      console.log(
        `Creator's Total Overall Balance (USD): $${totalCreatorBalance}`
      );
    } else {
      console.log(`Coin not found: ${coinAddress}`);
    }
  } catch (error) {
    console.error(`Error fetching details for ${coinAddress}:`, error);
  }
}

async function fetchAndSaveMostValuableCoins(after?: string) {
  try {
    const response = await getCoinsMostValuable({
      count: 10000,
      after,
    });

    console.log("Fetching top coins...");

    const coins = response.data?.exploreList?.edges || [];

    for (const coin of coins) {
      const coinAddress = coin.node?.address;
      if (coinAddress) {
        await fetchAndSaveCoinDetails(coinAddress as Address);
      }
    }

    for (const coin of coins) {
      const coinAddress = coin.node?.address;
      if (coinAddress) {
        await fetchAndSaveCoinComments(coinAddress as Address);
      }
    }

    const nextPageCursor = response.data?.exploreList?.pageInfo?.endCursor;
    if (nextPageCursor) {
      console.log("Fetching next page of coins...");
      await fetchAndSaveMostValuableCoins(nextPageCursor);
    }
  } catch (error) {
    console.error("Error fetching top coins:", error);
  }
}

async function main() {
  try {
    console.log("Starting Zora Coins scraper...");
    await fetchAndSaveMostValuableCoins();
    console.log("Scraping completed!");
  } catch (error) {
    console.error("Error in main function:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  updateFeedItem: (args: Prisma.FeedItemUpdateArgs) =>
    prisma.feedItem.update(args),

  getUserFeedItems: (args: Prisma.FeedItemFindManyArgs) =>
    prisma.feedItem.findMany(args),
});

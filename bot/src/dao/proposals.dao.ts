import { PrismaClient, Prisma } from "@prisma/client";

export const createDao = (prisma: PrismaClient) => ({
  createProposal: (args: Prisma.ProposalItemCreateArgs) =>
    prisma.notification.create(args),

  getAllProposalByUser: (args: Prisma.ProposalItemFindManyArgs) =>
    prisma.proposalItem.findMany(args),
});

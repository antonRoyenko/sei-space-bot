import { proposalsDao } from "@bot/dao";

export async function proposalsService(userId: number) {
  const proposals = await proposalsDao.getAllProposalByUser({
    where: {
      userId: userId,
    },
  });

  const createProposals = async (proposalId: string) => {
    await proposalsDao.createProposal({
      data: {
        proposalId: proposalId,
        userId: userId,
        isShowed: false,
      },
    });
  };

  return {
    proposals,
    createProposals,
  };
}

import { feedDao } from "@bot/dao";

export async function feedService(userId: number) {
  const feedItems = await feedDao.getUserFeedItems({
    where: {
      userId: userId,
    },
  });

  const updateFeedItem = async (id: number) => {
    await feedDao.updateFeedItem({
      where: {
        id,
      },
      data: {
        isShowed: true,
      },
    });
  };

  return {
    feedItems,
    updateFeedItem,
  };
}

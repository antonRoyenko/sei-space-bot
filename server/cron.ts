import fastifyCron from "fastify-cron";
import dayjs from "dayjs";
import { proposalsService, feedService, usersService } from "@bot/services";
import { notificationDao } from "@bot/dao";
import { sendNotification } from "@server/telegram";
import { template } from "@bot/utils";
import { en } from "@bot/constants/en";
import { seiNetworkConfig } from "@bot/constants/config";
import { getProposals } from "@bot/api";

export function cron(server: any) {
  server.register(fastifyCron, {
    jobs: [
      {
        cronTime: "*/10 * * * *",

        onTick: async () => {
          const notifications = await notificationDao.getAllNotifications();

          for (const notification of notifications) {
            const { createProposals, proposals: userProposals } =
              await proposalsService(notification.userId);
            const { getUser } = usersService();
            const user = await getUser({ id: notification.userId });

            if (!notification.isGovActive) return false;

            const { activeProposals } = await getProposals(
              seiNetworkConfig.publicUrl
            );

            const proposals = activeProposals[0];

            if (!proposals) return;

            for (const proposal of activeProposals) {
              const currentUsetProposal = userProposals.find(
                (item) => Number(item.proposalId) === proposal.proposalId
              );

              if (
                dayjs(notification.govTimeSubscription).isBefore(
                  dayjs(proposals.votingStartTime)
                ) &&
                !currentUsetProposal?.isShowed
              ) {
                await sendNotification(
                  template(en.cron.newProposal, {
                    networkName: "Sei Network",
                    title: proposals.title,
                    description: proposals.description,
                  }),
                  "HTML",
                  Number(user?.telegramId)
                );

                await createProposals(String(proposal.proposalId));
              }
            }
          }
        },
      },
      {
        cronTime: "*/10 * * * *",

        onTick: async () => {
          const notifications = await notificationDao.getAllNotifications();

          for (const notification of notifications) {
            const { getUser } = usersService();
            const { feedItems, updateFeedItem } = await feedService(
              notification.userId
            );

            const user = await getUser({ id: notification.userId });

            for (const item of feedItems) {
              if (item.isShowed) return;

              await sendNotification(
                template(en.cron.newTweet, {
                  networkName: "Sei Network",
                  text: item.text,
                }),
                "HTML",
                Number(user?.telegramId)
              );

              await updateFeedItem(item.id);
            }
          }
        },
      },
    ],
  });
}

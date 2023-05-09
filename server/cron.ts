import fastifyCron from "fastify-cron";
import dayjs from "dayjs";
import { usersService, proposalsService } from "@bot/services";
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
        cronTime: "* * * * *",

        onTick: async () => {
          const notifications = await notificationDao.getAllNotifications();

          for (const notification of notifications) {
            const { createProposals, proposals: userProposals } =
              await proposalsService(notification.userId);

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
                ) && !currentUsetProposal?.isShowed
              ) {
                await sendNotification(
                  template(en.cron.newProposal, {
                    networkName: "Sei Network",
                    title: proposals.title,
                    description: proposals.description,
                  }),
                  "HTML",
                  Number(notification.userId)
                );

                await createProposals(String(proposal.proposalId));
              }
            }
          }
        },
      },
    ],
  });
}

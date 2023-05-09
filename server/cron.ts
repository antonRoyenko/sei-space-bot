import fastifyCron from "fastify-cron";
import dayjs from "dayjs";
import { usersService, networksService } from "@bot/services";
import { notificationDao } from "@bot/dao";
import { sendNotification } from "@server/telegram";
import { template } from "@bot/utils";
import { en } from "@bot/constants/en";
import { getProposals } from "@bot/api";

export function cron(server: any) {
  server.register(fastifyCron, {
    jobs: [
      {
        cronTime: "* * * * *",

        onTick: async () => {
          const { getUser } = usersService();
          const { getNetwork } = networksService();

          const notifications = await notificationDao.getAllNotifications();

          for (const notification of notifications) {
            // const governanceNetworks =
            //   await networkInNotificationDao.getAllNetworkInNotification({
            //     where: {
            //       notificationId: notification.id,
            //     },
            //   });

            const user = (await getUser({
              id: notification.userId,
            })) || {
              timezone: "",
              telegramId: 0,
            };

            // const networks = governanceNetworks.filter(
            //   (item) => item.governanceNetworkId
            // );

            // if (networks.length === 0) return;

            // for (const network of networks) {
            //   const item = await getNetwork({ networkId: network.id });
            //   const { activeProposals } = await getProposals(item.publicUrl);
            //   const proposals = activeProposals[0];

            //   if (!proposals) return;

            //   if (
            //     dayjs(network.governanceTimeStart).isBefore(
            //       dayjs(proposals.votingStartTime)
            //     )
            //   ) {
            //     await sendNotification(
            //       template(en.cron.newProposal, {
            //         networkName: item.network.fullName,
            //         title: proposals.title,
            //         description: proposals.description,
            //       }),
            //       "HTML",
            //       Number(user.telegramId)
            //     );

            //     // await networkInNotificationDao.removeNetworkInNotification({
            //     //   where: {
            //     //     governanceNetworkId: network.id,
            //     //   },
            //     // });

            //     // await networkInNotificationDao.createNetworkInNotification({
            //     //   data: {
            //     //     notificationId: notification.id,
            //     //     governanceNetworkId: network.id,
            //     //     governanceTimeStart: dayjs().toDate(),
            //     //   },
            //     // });
            //   }
            // }
          }
        },
      },
    ],
  });
}

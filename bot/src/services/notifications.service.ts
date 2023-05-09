import { Context } from "@bot/types";
import { notificationDao } from "@bot/dao";

type Notification = {
  isGovActive: boolean;
  isTwitterSubscribeActive: boolean;
  updateNotification: ({
    triggerTwitterSubscriptionActivity,
    triggerGovActivity,
  }: {
    triggerTwitterSubscriptionActivity?: boolean;
    triggerGovActivity?: boolean;
  }) => Promise<void>;
};

export async function notificationsService({
  ctx,
}: {
  ctx?: Context;
}): Promise<Notification> {
  const user = ctx?.local.user || {
    id: 0,
  };
  const notification = await notificationDao.getNotification({
    where: {
      userId: user.id,
    },
  });

  const isGovActive = notification?.isGovActive || false;
  const isTwitterSubscribeActive =
    notification?.isTwitterSubscribeActive || false;

  const updateNotification = async ({
    triggerTwitterSubscriptionActivity,
    triggerGovActivity,
  }: {
    triggerTwitterSubscriptionActivity?: boolean;
    triggerGovActivity?: boolean;
  }) => {
    await notificationDao.upsertNotification({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
      },
      update: {
        isTwitterSubscribeActive: triggerTwitterSubscriptionActivity
          ? !isTwitterSubscribeActive
          : undefined,
        isGovActive: triggerGovActivity ? !isGovActive : undefined,
      },
    });
  };

  return {
    isGovActive,
    isTwitterSubscribeActive,
    updateNotification,
  };
}

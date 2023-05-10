import { Context } from "@bot/types";
import { Menu, MenuRange } from "@grammyjs/menu";
import { notificationsService } from "@bot/services";
import dayjs from "dayjs";

export const notificationMenu = new Menu<Context>("governance", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const { isGovActive, isTwitterSubscribeActive, updateNotification } =
    await notificationsService({
      ctx,
    });
  const time = dayjs().toDate();

  range.text(isGovActive ? `🔔 Proposals` : `🔕 Proposals`, async (ctx) => {
    await updateNotification({
      triggerGovActivity: true,
      govTimeSubscription: time,
    });
    ctx.menu.update();
  });

  range.row();

  range.text(
    isTwitterSubscribeActive ? `🔔 Twitter` : `🔕 Twitter`,
    async (ctx) => {
      await updateNotification({ triggerTwitterSubscriptionActivity: true });
      ctx.menu.update();
    }
  );

  return range;
});

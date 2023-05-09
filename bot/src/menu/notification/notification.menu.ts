import { Context } from "@bot/types";
import { Menu, MenuRange } from "@grammyjs/menu";
import { notificationsService } from "@bot/services";

export const notificationMenu = new Menu<Context>("governance", {
  autoAnswer: false,
}).dynamic(async (ctx) => {
  const range = new MenuRange<Context>();

  const { isGovActive, isTwitterSubscribeActive, updateNotification } =
    await notificationsService({
      ctx,
    });

  range.text(isGovActive ? `🔔 Proposals` : `🔕 Proposals`, async (ctx) => {
    await updateNotification({ triggerGovActivity: true });
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

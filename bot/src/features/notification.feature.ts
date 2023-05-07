import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { notificationMenu } from "@bot/menu";
import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";

export const feature = router.route(ROUTE.NOTIFICATION);

feature.command(
  en.notification.command,
  logHandle(ROUTE_LOGS.NOTIFICATION),
  async (ctx) =>
    await ctx.reply(en.notification.menu.title, {
      reply_markup: notificationMenu,
    })
);

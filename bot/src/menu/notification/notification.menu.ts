import { Context } from "@bot/types";
import { proposalMenu } from "@bot/menu";
import { menuCreator } from "@bot/utils/menuCreator";
import { en } from "@bot/constants/en";

const menuList = [
  {
    text: en.notification.menu.proposals,
    callback: (ctx: Context) =>
      ctx.reply(en.notification.proposalMenu.title, {
        reply_markup: proposalMenu,
      }),
  },
];

export const notificationMenu = menuCreator("notification", menuList);

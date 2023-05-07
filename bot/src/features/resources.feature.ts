import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";
import { seiResorces } from "@bot/constants/config";
import { capitalizeFirstLetter, template } from "@bot/utils";

export const feature = router.route(ROUTE.RESOURCES);

feature.command(
  en.resources.command,
  logHandle(ROUTE_LOGS.RESOURCES),
  async (ctx) => {
    let output = "";

    const resource = seiResorces;

    for (const [item, link] of Object.entries(resource)) {
      if (typeof link === "string" && link.length > 0) {
        output += template(en.resources.menu.resourceItem, {
          item: capitalizeFirstLetter(item),
          link,
        });
      }
    }

    return ctx.reply(output, { disable_web_page_preview: true });
  }
);

import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { statisticCallback } from "@bot/menu/callbacks";
import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";

export const feature = router.route(ROUTE.STATISTIC);

feature.command(
  en.statistic.command,
  logHandle(ROUTE_LOGS.STATISTIC),
  async (ctx) => {
    await statisticCallback(ctx);
  }
);

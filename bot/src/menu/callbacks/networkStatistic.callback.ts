import { Context } from "@bot/types";
import { getStatistic } from "@bot/api";
import { formatTokenPrice, nFormatter, template } from "@bot/utils";
import { toNumber } from "lodash";
import { en } from "@bot/constants/en";

export async function statisticCallback(ctx: Context) {
  const { communityPool, height, apr, inflation, bonded, unbonding, unbonded } =
    await getStatistic();

  return ctx.reply(
    template(en.statistic.menu.statisticDescription, {
      denom: `${communityPool?.displayDenom?.toUpperCase()}`,
      apr: `${apr > 0 ? `${formatTokenPrice(apr)}%` : "&#60;unknown&#62;"}`,
      inflation: `${formatTokenPrice(inflation * 100)}`,
      height: `${height ?? 0}`,
      communityPool: `${nFormatter(toNumber(communityPool?.value), 2)}`,
      bonded: `${nFormatter(toNumber(bonded), 0)}`,
      unbonding: `${nFormatter(toNumber(unbonding), 0)}`,
      unbonded: `${nFormatter(toNumber(unbonded), 0)}`,
    }),
    { parse_mode: "HTML" }
  );
}

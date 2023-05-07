import { logHandle } from "@bot/helpers/logging";
import { router } from "@bot/middlewares";
import { en } from "@bot/constants/en";
import { ROUTE, ROUTE_LOGS } from "@bot/constants/route";
import { getProposals } from "@bot/api";
import { seiNetworkConfig } from "@bot/constants/config";
import { template, getNumberEmoji } from "@bot/utils";

export const feature = router.route(ROUTE.PROPOSALS);

feature.command(
  en.proposals.command,
  logHandle(ROUTE_LOGS.PROPOSALS),
  async (ctx) => {
    let output = "";
    const { activeProposals } = await getProposals(seiNetworkConfig.publicUrl);

    if (activeProposals.length === 0) {
      return ctx.reply(en.proposals.menu.noProposal);
    }

    activeProposals.map(({ title, description }, key) => {
      if (activeProposals.length > 1) {
        output += template(en.proposals.menu.proposalDescriptionTitle, {
          number: getNumberEmoji(key + 1),
        });
      }
      const str = template(en.proposals.menu.proposalDescription, {
        title: title,
        description: description,
      });
      output += str.replaceAll(/[\\]+[n]/gm, "\n");

      if (output.length > 4000) {
        output = output.slice(0, 4000) + "... \n\n";
      }

      ctx.reply(output, { disable_web_page_preview: true });
    });
  }
);

import { Wallet } from "@prisma/client";
import { getBalance } from "@bot/api";
import _ from "lodash";
import { networksService, walletsService } from "@bot/services";
import { getNumberEmoji, template } from "@bot/utils";
import { en } from "@bot/constants/en";
import { Context } from "@bot/types";

export async function assetsCallback(wallet: Wallet, index?: number) {
  let output = "";

  const { getNetwork } = networksService();
  const { address, networkId } = wallet;
  const { publicUrl } = await getNetwork({
    networkId,
  });

  const data = await getBalance(publicUrl, address);
  const denomUppercase = data.available.displayDenom.toUpperCase();

  output += template(en.assets.menu.walletDescription, {
    number: index ? getNumberEmoji(index) : "",
    address,
    denom: denomUppercase,
    available: data.available.value,
    delegate: data.delegate.value,
    unbonding: data.unbonding.value,
    reward: data.reward.value,
    totalCrypto: data.total.value,
  });

  return output;
}

export async function totalAmountCallback(ctx: Context) {
  const { getAllUserWallets } = walletsService(ctx);
  const userWallets = await getAllUserWallets();

  let output = "";
  const balances = [];

  for await (const wallet of userWallets) {
    const { getNetwork } = networksService();
    const { address, networkId } = wallet;
    const { publicUrl, network } = await getNetwork({
      networkId,
    });

    const data = await getBalance(publicUrl, address);
    balances.push({
      networkName: network.name,
      amount: Number(data.total.value),
    });
  }

  const totalBalance = balances.reduce((accumulator: any, currentValue) => {
    let amount = _.get(currentValue, ["amount"], 0);

    if (accumulator[currentValue.networkName]) {
      amount += accumulator[currentValue.networkName];
    }

    return {
      ...accumulator,
      [currentValue.networkName]: amount,
    };
  }, {});

  Object.entries(totalBalance).forEach(([key, value], index) => {
    output += template(en.assets.menu.total, {
      number: getNumberEmoji(index + 1),
      networkName: key,
      amount: `${value}`,
    });
  });

  return output;
}

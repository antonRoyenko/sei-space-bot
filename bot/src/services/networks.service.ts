import { networkDao } from "@bot/dao";
import { ChainInfo } from "@bot/types/general";
import { seiChainConfig } from "@bot/chains/sei";
import { seiNetworkConfig } from "@bot/constants/config";

export const networksService = () => {
  const getNetwork = async ({
    networkId,
    name,
  }: {
    networkId?: number;
    name?: string;
  }) => {
    const network = (await networkDao.getNetwork({
      where: {
        id: networkId,
        name,
      },
    })) || { name: "", publicUrl: "", fullName: "", id: 0 };
    const chain: ChainInfo = seiChainConfig;
    const { tokenUnits, primaryTokenUnit } = chain;
    const publicUrl = seiNetworkConfig.publicUrl;
    const denom = tokenUnits[primaryTokenUnit].display;

    return {
      network,
      publicUrl,
      denom,
    };
  };

  const getAllNetworks = async () => {
    const networks = await networkDao.getAllNetworks();

    return networks.sort((a, b) => a.fullName.localeCompare(b.fullName));
  };

  return {
    getNetwork,
    getAllNetworks,
  };
};

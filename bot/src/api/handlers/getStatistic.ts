import _ from "lodash";
import {
  fetchCommunityPool,
  fetchDistributionParams,
  fetchInflation,
  fetchPool,
  fetchSupply,
  fetchLatestHeight,
  fetchAnnualProvisions,
  fetchNetworkStatistic,
} from "@bot/api";
import numeral from "numeral";
import { seiNetworkConfig } from "@bot/constants/config";
import { seiChainConfig } from "@bot/chains/sei";
import { Coins, StatisticData } from "@bot/types/general";
import { formatToken } from "@bot/utils";
import { getBlocksPerYearReal } from "@bot/utils/getBlocksPerYearReal";
import { calculateRealAPR } from "@bot/utils/calculateApr";

export const getStatistic = async () => {
  const { primaryTokenUnit } = seiChainConfig;
  const publicUrl = seiNetworkConfig.publicUrl;
  const denom = seiChainConfig.tokenUnits.usei.display;

  const promises = [
    fetchCommunityPool(publicUrl),
    fetchInflation(publicUrl, denom),
    fetchSupply(publicUrl, primaryTokenUnit),
    fetchPool(publicUrl),
    fetchDistributionParams(publicUrl),
    fetchLatestHeight(publicUrl),
    fetchAnnualProvisions(publicUrl),
    fetchNetworkStatistic(publicUrl),
    getBlocksPerYearReal(publicUrl),
  ];

  const [
    communityPool,
    inflation,
    supply,
    pool,
    distributionParams,
    latestHeight,
    annualProvisions,
    networkStatistic,
    blocksPerYear,
  ] = await Promise.allSettled(promises);

  const formattedRawData: StatisticData = {
    communityPool: {},
    inflation: {},
    supply: {
      amount: 0,
      denom: "",
    },
    pool: {},
    distributionParams: {},
    height: "",
    annualProvisions: "",
    networkStatistic: {},
    blocksPerYear: 0,
  };

  formattedRawData.communityPool = _.get(
    communityPool,
    ["value", "communityPool"],
    {}
  );
  formattedRawData.inflation = _.get(inflation, ["value", "inflation"], 0);
  formattedRawData.supply = _.get(supply, ["value", "supply"], {});
  formattedRawData.pool = _.get(pool, ["value", "pool"], {});
  formattedRawData.distributionParams = _.get(
    distributionParams,
    ["value", "params"],
    {}
  );
  formattedRawData.height = _.get(
    latestHeight,
    ["value", "height", "last_commit", "height"],
    ""
  );
  formattedRawData.annualProvisions = _.get(
    annualProvisions,
    ["value", "annualProvisions"],
    ""
  );
  formattedRawData.networkStatistic = _.get(
    networkStatistic,
    ["value", "networkStatistic"],
    ""
  );
  formattedRawData.blocksPerYear = _.get(
    blocksPerYear,
    ["value", "blocksPerYear"],
    ""
  );

  return formatStatisticsValues(formattedRawData);
};

const formatStatisticsValues = (data: StatisticData) => {
  try {
    const { primaryTokenUnit, tokenUnits } = seiChainConfig;
    let communityPool;

    const [communityPoolCoin]: [Coins] = _.get(
      data,
      ["communityPool"],
      []
    ).filter((x: Coins) => x.denom === seiChainConfig.primaryTokenUnit);

    const inflation = _.get(data, ["inflation"], 0);

    const total = _.get(data, ["supply"], {
      amount: 0,
    });

    const rawSupplyAmount = total.amount;

    const supply = formatToken(
      rawSupplyAmount,
      tokenUnits.usei,
      primaryTokenUnit
    );

    if (
      communityPoolCoin &&
      communityPoolCoin.denom === seiChainConfig.primaryTokenUnit
    ) {
      communityPool = formatToken(
        communityPoolCoin.amount,
        tokenUnits.usei,
        communityPoolCoin.denom
      );
    }

    const bonded = _.get(data, ["pool", "bonded"], 1);
    const unbonding = _.get(data, ["pool", "notBonded"], 1);
    const unbonded = rawSupplyAmount - unbonding - bonded;

    const communityTax = _.get(
      data,
      ["distributionParams", "community_tax"],
      "0"
    );

    const apr = calculateRealAPR({
      annualProvisions: Number(data.annualProvisions),
      communityTax: communityTax,
      bondedTokens: bonded,
      blocksYearReal: data.blocksPerYear,
    });

    return {
      supply,
      inflation,
      communityPool,
      apr: Number(apr),
      height: data.height,
      bonded: numeral(
        formatToken(bonded, tokenUnits.usei, primaryTokenUnit).value
      ).value(),
      unbonding: numeral(
        formatToken(unbonding, tokenUnits.usei, primaryTokenUnit).value
      ).value(),
      unbonded: numeral(
        formatToken(unbonded, tokenUnits.usei, primaryTokenUnit).value
      ).value(),
    };
  } catch (e) {
    return {
      supply: 0,
      inflation: 0,
      communityPool: {
        displayDenom: "",
        value: 0,
      },
      apr: 0,
      height: 0,
      bonded: 0,
      unbonding: 0,
      unbonded: 0,
    };
  }
};

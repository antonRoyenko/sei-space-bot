import { Bech32Address } from "@keplr-wallet/cosmos";

export const seiChainConfig = {
  network: "sei",
  prefix: Bech32Address.defaultBech32Config("sei"),
  primaryTokenUnit: "usei",
  tokenUnits: {
    usei: {
      display: "sei",
      exponent: 6,
    },
  },
};

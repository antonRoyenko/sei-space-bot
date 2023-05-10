export const en = {
  aboutBot: "Statistic, Personal assets, Notification in Sei network.",
  descriptionBot:
    "This bot can send Wallet(s) assets, network statistics, and different types of notifications",
  start: {
    command: "start",
    text:
      "I'm the @SeiSpaceBot \n\n" +
      "<b>I have a lot of useful functions such as:</b>  \n\n" +
      "<i>Manage wallets</i>\n" +
      "<i>View cryptocurrency assets</i>\n" +
      "<i>Network statistics in atlantic-2 network</i>\n" +
      "<i>Show active proposals</i>\n" +
      "<i>List of resources about networks</i>\n" +
      "<i>Subscribe to networks proposals</i>\n" +
      "<i>Subscribe to Sei twitter feed</i>\n\n" +
      "/help get full command list \n\n" +
      "Reach Out to the Developer @ReactiveGuy",
  },
  help: {
    command: "help",
    text:
      "/wallet - Manage wallets \n" +
      "/assets - View cryptocurrency Assets \n" +
      "/statistic - View one of the network statistic \n" +
      "/notification - Use notifications to get alerts \n" +
      "/proposals - View proposals in different chains \n" +
      "/resources - The list of resources about one of the Network \n" +
      "/help - Full command list \n" +
      "/about - About bot \n",
  },
  wallet: {
    command: "wallet",
    invalidFormat:
      "Format should be: (If you don't want, fill in /reset) \n\n" +
      "Address\n" +
      "Wallet name\n\n",
    invalidAddress:
      "Enter a valid address. If you don't want enter, fill in /reset",
    invalidNetwork:
      "Network %{networkName} is not supported, enter other chain. If you don't want enter, fill in /reset",
    duplicateAddress:
      "You already have this wallet. If you don't want enter, fill in /reset",
    addMore: "Add one more wallet",
    success: "Perfect! Use /assets command",
    menu: {
      title:
        "Choose the Action \n\n" +
        "Note: Your addresses stores in encrypted format,\n" +
        "so it's absolutely secure. You can check it from the " +
        // TODO change link
        "<a href='https://github.com/antonRoyenko/cosmos-space-bot/blob/8059c2257faa4b16a8be948c52134030ae240e03/bot/src/features/wallet.feature.ts'>link</a>",
      manually: "👇 Add Manually",
      bulkImport: "📁 Add via .csv",
      bulkExport: "📎 Export addresses",
      list: "💳 List of Wallets",
      delete: "🗑 Delete a wallet",
      removeAll: "Remove all wallets",
    },
    addAddress:
      "Enter your address in format:\n\n" + "Address\n" + "Wallet name \n",
    addBulkWallet:
      "Send .csv file with wallet addresses, example of .csv file above",
    showWallet: "%{number} <b>%{name}</b> - %{address}",
    deleteWallet: "Choose the wallet that you want to remove",
    removedWallet: "Wallet %{address} was successful removed",
    removedAllWallets: "All wallets were removed",
    emptyWallet: "You don't have wallets, please add it /wallet",
    bulkImportAddressInvalid:
      "Check addresses in file and reload file. If you don't want, fill in /reset",
    bulkImportNetworkInvalid:
      "Network %{networkName} is not supported, fix and reload file. If you don't want, fill in /reset",
    bulkImportDuplicateAddress:
      "Wallet %{walletAddress} duplicated, remove it and reload file. If you don't want, fill in /reset",
    incorrectCSV: "Incorrect .csv file format, should be comma separator",
    successfulImport: "File was successful uploaded",
    emptyPassword:
      "Please enter a password, which will be stored locally in your telegram session and " +
      "is necessary to keep your wallets securely. " +
      "In the future, it will be used for decryption wallet addresses.",
  },
  assets: {
    command: "assets",
    menu: {
      title: "Choose wallet(s)",
      all: "Total amount",
      walletDescription:
        "<b>Wallet %{number}:</b> <i>%{address}</i> \n" +
        "\n<b>Balance in %{denom}: </b>\n\n" +
        "<i>👉 Available</i> — %{available} \n\n" +
        "<i>💸 Delegated</i> — %{delegate} \n\n" +
        "<i>🔐 Unbonding</i> — %{unbonding} \n\n" +
        "<i>🤑 Staking Reward</i> — %{reward} \n\n" +
        "<b>Total %{denom}</b> — %{totalCrypto} \n",
      total: "%{number} <i>%{networkName}</i> — <b>%{amount}</b> \n\n",
    },
  },
  notification: {
    command: "notification",
    menu: {
      title: "Choose the Action",
      reminder: "🗓 Set Up Daily Report Reminders",
      proposals: "📝 Proposals",
    },
    proposalMenu: {
      title: "Choose the network(s)",
    },
  },
  resources: {
    command: "resources",
    menu: {
      title: "Choose network",
      resourceItem: "🔘 <b>%{item}:</b> %{link} \n",
    },
  },
  statistic: {
    command: "statistic",
    menu: {
      title: "Choose the Network",
      statisticDescription:
        "<i>🔝 Height</i> - %{height} \n\n" +
        "<i>🌐 Community Pool</i> - %{communityPool} \n\n" +
        "<i>📊 Inflation</i> - %{inflation}% \n\n" +
        "<b>Tokenomics</b>: \n\n" +
        "<i>🔒 Bonded</i> - %{bonded} \n\n" +
        "<i>🔐 Unbonding</i> - %{unbonding} \n\n" +
        "<i>🔓 Unbonded</i> - %{unbonded} \n",
      unknownPrice: "%{networkName} - &#60;price is unknown&#62;",
    },
  },
  proposals: {
    command: "proposals",
    menu: {
      title: "Choose the Network",
      proposalDescriptionTitle: "<b>Proposal %{number}</b> \n\n",
      proposalDescription: "%{title}  \n\n" + "%{description} \n\n",
      noProposal: "🙅‍♂️ No active proposal",
    },
  },
  cron: {
    reminderTitle: "⏰⏰⏰ Price reminder at time %{date} ⏰⏰⏰ \n\n",
    reminderItem: "%{networkName} — $%{price} \n",
    alarmTitle: "🚨🚨🚨 Alarm❗ %{networkName} price — $%{price} 🚨🚨🚨",
    newProposal:
      "🚨 New proposal from %{networkName}❗🚨 \n\n" +
      "%{title}  \n\n" +
      "%{description}",
    newTweet: "🚨 New tweet from %{networkName}❗🚨 \n\n" + "%{text}  \n",
  },
  about: {
    command: "about",
    title:
      "I hope this bot you is useful for you. \n\n" +
      "If you have question or proposals how I can improve it " +
      "you can always reach me out @ReactiveGuy. \n" +
      "Here is more info about the bot implementation and <a href='https://github.com/antonRoyenko/sei-space-bot'>Github</a>",
  },
  reset: {
    command: "reset",
    title: "Step reseted",
  },
  unknownRoute:
    "Sorry, I don't understand you, please use /help to get the full command list",
  addMoreQuestion: "Do you want add more?",
  back: "<< Go back",
};

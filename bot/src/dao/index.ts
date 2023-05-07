import { prisma } from "@server/prisma";
import { createDao as createNetworkInNotificationDao } from "./networksInNotification.dao";
import { createDao as createNotificationDao } from "./notifications.dao";
import { createDao as createResourceDao } from "./resources.dao";
import { createDao as createUserDao } from "./users.dao";
import { createDao as createWalletDao } from "./wallets.dao";
import { createDao as createNetworkDao } from "./networks.dao";

export const networkInNotificationDao = createNetworkInNotificationDao(prisma);
export const notificationDao = createNotificationDao(prisma);
export const resourceDao = createResourceDao(prisma);
export const userDao = createUserDao(prisma);
export const walletDao = createWalletDao(prisma);
export const networkDao = createNetworkDao(prisma);

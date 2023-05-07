import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const networkData: Prisma.NetworkCreateInput[] = [
  {
    name: "sei",
    fullName: "Sei",
    publicUrl: "https://rest.atlantic-2.seinetwork.io/",
    resource: {
      create: {
        site: "https://www.seinetwork.io/",
        discord: "https://discord.gg/sei",
        twitter: "https://twitter.com/SeiNetwork",
        github: "https://t.me/seinetwork",
        telegram: "https://t.me/seinetwork",
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of networkData) {
    const network = await prisma.network.create({
      data: u,
    });
    console.log(`Created network: ${network.name}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

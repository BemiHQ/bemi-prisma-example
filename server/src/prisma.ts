import { PrismaClient } from "@prisma/client";
import { PrismaPg, withBemiExtension } from "@bemi-db/prisma";

const adapter = new PrismaPg({ connectionString: process.env.SOURCE_DB_URI });

export const prisma = withBemiExtension(
  new PrismaClient({
    adapter,
    log: [
      { emit: "stdout", level: "query" },
      { emit: "stdout", level: "error" },
      { emit: "stdout", level: "info" },
      { emit: "stdout", level: "warn" },
    ],
  }),
);

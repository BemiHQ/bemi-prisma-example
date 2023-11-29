import { PrismaClient } from "@prisma/client";
import { withPgAdapter } from "@bemi-db/prisma";

export const prisma = withPgAdapter(
  new PrismaClient({
    log: [
      { emit: "stdout", level: "query" },
      { emit: "stdout", level: "error" },
      { emit: "stdout", level: "info" },
      { emit: "stdout", level: "warn" },
    ],
  })
)

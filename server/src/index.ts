import cors from "cors";
import express, { Request } from "express";
import { setContext } from "@bemi-db/prisma";

import { todosRouter } from "./todos.router";
import { prisma } from "./prisma";
import { bemiPrisma } from "./bemi-prisma";

const main = async (): Promise<void> => {
  // console.log(await bemiPrisma.change.findMany())

  const app = express();
  const port = 4001;

  app.use(express.json());
  app.use(cors());

  app.use(
    setContext(prisma, (req: Request) => ({
      apiEndpoint: req.url,
      userId: (req as any).user?.id || 1,
      params: req.body,
    }))
  )

  app.use("/", todosRouter);

  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});

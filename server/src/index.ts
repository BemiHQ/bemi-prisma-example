import cors from "cors";
import express, { Request } from "express";
import { bemiMiddleware } from "@bemi-db/prisma";
import { expressMiddleware } from '@apollo/server/express4';

import { apolloServer } from "./apollo-server";
import { todosRouter } from "./todos.router";

const main = async (): Promise<void> => {
  // console.log(await bemiPrisma.change.findMany())

  const app = express();
  const port = 4001;

  app.use(express.json());
  app.use(cors());

  app.use(
    bemiMiddleware((req: Request) => ({
      apiEndpoint: req.url,
      userId: (req as any).user?.id || 1,
      params: req.body,
    }))
  )
  app.use("/", todosRouter);

  await apolloServer.start();
  app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(apolloServer, {
    context: async ({ req, res }) => ({
      userId: 1,
    }),
  }));

  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});

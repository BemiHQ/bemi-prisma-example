import { setContext } from "@bemi-db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";

import { prisma } from "../../../src/prisma";

type ResponseData = { todo: object }

const router = createRouter<NextApiRequest, NextApiResponse<ResponseData>>();

// http://localhost:4003/api/next-express

router
  .use(
    setContext((req: any) => ({
      url: req.url,
      userToken: req.cookies['user-token'],
    })) as any
  )
  .get(async (req, res) => {
    const todo = await prisma.todo.create({ data: { task: 'Next with Express.js middleware', isCompleted: false } });
    res.status(200).json({ todo });
  })

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});

import { setBemiContext } from "@bemi-db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../src/prisma";

type ResponseData = { todo: object }

// http://localhost:4003/api/next

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  setBemiContext({ url: req.url, userToken: req.cookies['user-token'] });

  const todo = await prisma.todo.create({ data: { task: 'Next', isCompleted: false } });

  res.status(200).json({ todo })
}

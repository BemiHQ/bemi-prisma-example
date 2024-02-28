import type { NextApiRequest, NextApiResponse } from 'next'
import { bemiContext } from "@bemi-db/prisma";

import { prisma } from "../../../src/prisma";

type ResponseData = {
  message: string
}

// http://localhost:4003/api/test

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  bemiContext({ url: req.url, userToken: req.cookies['user-token'] });

  const todo = await prisma.todo.create({ data: { task: 'Next', isCompleted: false } });

  res.status(200).json({ todo })
}

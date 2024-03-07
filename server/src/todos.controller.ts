import { Request, Response } from "express";

import { prisma } from "./prisma";
// import { bemiPrisma } from "./bemiPrisma";

export const todos = async (_req: Request, res: Response): Promise<void> => {
  // const result = await bemiPrisma.change.findMany({
  //   where: { table: "todo", context: { path: ['userId'], equals: 1 } },
  //   orderBy: { committedAt: "desc" },
  //   take: 1,
  // });
  // const result = await bemiPrisma.$queryRaw`
  //   SELECT * FROM "changes"
  //   WHERE "table" = 'todo' AND "context" @> '{"userId": 1}'
  //   ORDER BY "committed_at" DESC
  //   LIMIT 1
  // `;
  // console.log(result);

  const data = await prisma.todo.findMany();
  res.status(200).json(data);
};

export const todo = async (req: Request, res: Response): Promise<void> => {
  const { task } = req.body;
  const todo = await prisma.todo.create({ data: { task, isCompleted: false } });
  res.status(201).json({ message: "Todo added", todo });
};

export const complete = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.body?.id);

  const todo = await prisma.todo.findUnique({ where: { id } })
  if (todo) {
    await prisma.todo.update({ where: { id }, data: { isCompleted: !todo.isCompleted } })
    res.status(200).json({ message: `Todo changed to ${todo.isCompleted}` });
  } else {
    res.status(404).json({ message: "No Todo found" });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params?.id);
  const todo = await prisma.todo.findUnique({ where: { id } })
  if (todo) {
    await prisma.todo.delete({ where: { id } })
    res.status(204).json({ message: "Todo successfully deleted" });
  } else {
    res.status(404).json({ message: "No Todo found" });
  }
};

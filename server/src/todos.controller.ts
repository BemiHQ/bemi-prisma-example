import { Request, Response } from "express";
import { currentBemiContext, mergeBemiContext } from "@bemi-db/prisma";

import { prisma } from "./prisma";
// import { bemiPrisma } from "./bemiPrisma";

export const todos = async (_req: Request, res: Response): Promise<void> => {
  //// Querying changes
  //const result = await bemiPrisma.change.findMany({
  //  where: { table: "todo", context: { path: ['userId'], equals: 1 } },
  //  orderBy: { committedAt: "desc" },
  //  take: 1,
  //});
  //const result = await bemiPrisma.$queryRaw`
  //  SELECT * FROM "changes"
  //  WHERE "table" = 'todo' AND "context" @> '{"userId": 1}'
  //  ORDER BY "committed_at" DESC
  //  LIMIT 1
  //`;
  //console.log(result);

  //// CRUD operations
  //const upsertUser = await prisma.todo.upsert({
  //  where: { id: 41 },
  //  update: { task: 'Task 3' },
  //  create: { task: 'Task 3', isCompleted: false },
  //})

  //// Raw SQL queries
  //let result = await prisma.$executeRaw`SELECT * FROM "todos"`
  //console.log(result)
  //result = await prisma.$executeRaw`UPDATE "public"."todos" SET "task" = now()::text WHERE "id" = 41`
  //console.log(result)

  //// Mass operations
  //let result = await prisma.todo.createMany({
  //  data: [
  //    { task: "Task 1", isCompleted: false },
  //    { task: "Task 2", isCompleted: false },
  //  ],
  //})
  //console.log(result)

  //// Promise with multiple queries
  //const tasks = [1, 2, 3].map(num => prisma.todo.create({ data: { task: `Task ${num}`, isCompleted: false } }));
  //await Promise.all(tasks);

  ////Transactions
  //const [posts, totalPosts] = await prisma.$transaction([
  //  prisma.todo.findMany(),
  //  prisma.todo.create({ data: { task: 'Task 4', isCompleted: false } }),
  //  prisma.todo.update({ where: { id: 41 }, data: { task: 'Task 0' } })
  //])

  //// Transactions with raw queries
  //const [userList, updateUser] = await prisma.$transaction([
  //  prisma.$queryRaw`SELECT * FROM "todos"`,
  //  prisma.$executeRaw`UPDATE "public"."todos" SET "task" = now()::text WHERE "id" = 41`,
  //  prisma.$executeRaw`UPDATE "public"."todos" SET "task" = now()::text WHERE "id" = 41`,
  //])

  //// Interactive transactions
  //await prisma.$transaction(async (tx: any) => {
  //  let result = await tx.todo.create({ data: { task: 'Task 5', isCompleted: false } })
  //  console.log(result)
  //})

  //// Nested queries
  //let result = await prisma.todo.update({
  //  where: { id: 41 },
  //  data: {
  //    author: {
  //      create: { name: 'Hi' },
  //    },
  //  },
  //})
  //console.log(result)

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

  mergeBemiContext({ foo: "bar" })

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

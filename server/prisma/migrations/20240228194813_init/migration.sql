-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "task" VARCHAR(255) NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

import { Router } from "express";
import { complete, remove, todo, todos } from "./todos.controller";

export const todosRouter: Router = Router();

todosRouter.route("/todos").get(todos);
todosRouter.route("/todo").post(todo);
todosRouter.route("/todo/complete").put(complete);
todosRouter.route("/todo/:id").delete(remove);

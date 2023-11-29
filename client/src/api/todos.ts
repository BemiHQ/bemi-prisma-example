import { AXIOS } from "../config/_axios";

export type TodoType = {
  id: number
  task: string
  isCompleted: boolean
}

export const createTodo = async (todo: Omit<TodoType, "id">) => {
  try {
    const response = await AXIOS.post("/todo", todo);
    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw new Error("Problem inserting, check if database is connected");
  }
};

export const removeTodo = async (id: number) => {
  try {
    const response = await AXIOS.delete(`/todo/${id}`);
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(
      "Problem deleting, check if database is connected or if todo exists"
    );
  }
};

export const updateTodo = async (id: number) => {
  try {
    const response = await AXIOS.put("/todo/complete", { id });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(
      "Problem updating, check if database is connected or if todo exists"
    );
  }
};

export const getTodos = async (): Promise<TodoType[]> => {
  const response = await AXIOS.get("/todos");
  return response?.data;
};

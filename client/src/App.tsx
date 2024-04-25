/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Divider, Flex, Heading, Stack } from "@chakra-ui/layout";
import React, { useEffect, useState, SyntheticEvent } from "react";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import { Box } from "@chakra-ui/react";

import {
  TodoType,
  getTodos,
  createTodo,
  removeTodo,
  updateTodo,
} from "./api/todos";
import Nav from "./components/Nav";
import Todo from "./components/Todo";

function App() {
  const [todoTask, setTodoTask] = useState("");
  const [todos, setTodos] = useState<TodoType[]>();
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      const data = await getTodos();
      setTodos(data);
    }
    fetchData();
  }, []);

  const handleUpdate = async (e: SyntheticEvent, id: number) => {
    setTodos(
      todos?.map((t) => {
        if (t.id === id) {
          return { ...t, isCompleted: (e.target as HTMLInputElement).checked };
        } else {
          return t;
        }
      })
    );

    const res = await updateTodo(id);
    if (res) {
      toast({
        title: "To do changed",
        description: "Successfully changed status",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: number) => {
    const res = await removeTodo(id);
    if (res) {
      setTodos(todos?.filter((t) => t.id !== id));
      toast({
        title: "To do removed",
        description: "Successfully removed from the list",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const newTodo = {
      task: todoTask,
      isCompleted: false,
    };
    const res = await createTodo(newTodo);
    if (res) {
      //toast
      setTodos([...(todos || []), res.todo]);
      setTodoTask("");
      toast({
        title: "To do added",
        description: `${newTodo["task"]} added to the list`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="App">
      <Box mt={8} mx="auto" maxW={"1000px"} w="100%">
        <Nav />
        <Flex justifyContent="center" alignItems="center">
          <Stack spacing={4}>
            <Heading as="h2" size="sm" mt={5}>
              Enter a task
            </Heading>
            <form onSubmit={handleSubmit}>
              <Input
                variant="outline"
                placeholder="Walk my dog.."
                width="450px"
                value={todoTask}
                onChange={(e) =>
                  setTodoTask((e.target as HTMLInputElement).value)
                }
                mt={3}
              />
              <Button
                colorScheme="teal"
                size="sm"
                width="55px"
                type="submit"
                height="40px"
                ml={2}
                mb={1}
              >
                Add
              </Button>
            </form>

            <Divider orientation="horizontal" />
            <Heading as="h2" size="sm">
              Todos
            </Heading>
            {todos ? (
              todos.map((t, index) => {
                return (
                  <Todo
                    key={t.id}
                    todo={t}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  />
                );
              })
            ) : (
              <Spinner />
            )}
          </Stack>
        </Flex>
      </Box>
    </div>
  );
}

export default App;

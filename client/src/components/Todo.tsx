import { Checkbox } from "@chakra-ui/checkbox";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, Spacer, Text } from "@chakra-ui/layout";
import { SyntheticEvent } from "react";

import { TodoType } from "../api/todos";

const Todo = (
  { todo, handleUpdate, handleDelete }:
    { todo: TodoType, handleUpdate: (e: SyntheticEvent, id: number) => void, handleDelete: (id: number) => void },
) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <HStack>
        <Text mt={1}>
          {todo.task}
        </Text>
        <Spacer />
        <Checkbox
          color="gray"
          isChecked={todo.isCompleted}
          mr={1}
          onChange={(e) => handleUpdate(e, todo.id)}
        ></Checkbox>
        <DeleteIcon color="gray" onClick={() => handleDelete(todo.id)} style={{ cursor: 'pointer' }} />
      </HStack>
    </Box>
  );
};
export default Todo;

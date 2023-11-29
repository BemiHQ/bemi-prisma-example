import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Nav = () => {
  return (
    <Box bg="tomato" w="100%" p={4} color="white">
      <Flex>
        <Heading as="h2" size="md" isTruncated>
          To Do List
        </Heading>
      </Flex>
    </Box>
  );
};

export default Nav;

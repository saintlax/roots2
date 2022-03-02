import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FilterBox } from './components/FilterBox';

import { UsersTable } from "./components/UsersTable"

const Users = () => {
  return (
    <Box>
      <Flex my="20px" justifyContent={["space-between"]}>
        <Box>
          <Text color={"#4A4C4F"} fontSize={["20px"]} fontWeight={["bold"]}>
            Users
          </Text>
        </Box>
        <Box>
          <FilterBox />
        </Box>
      </Flex>
      <Box>
        <UsersTable />
      </Box>
    </Box>
  );
};

export default Users;

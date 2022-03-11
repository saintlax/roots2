import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { BranchSummary } from './components/BranchSummary';
import { Dropdown } from './components/Dropdown';


import { OrdersTable } from "./components/OrdersTable";

export const Branches = () => {
  return (
    <Box>
      <Flex my="20px" justifyContent={["space-between"]}>
        <Box>
          <Text color={"#4A4C4F"} fontSize={["20px"]} fontWeight={["bold"]}>
            Branches Summary
          </Text>
        </Box>
        <Box>
          <Button bg={"#1459DF"} color="#fff">
            Create New
          </Button>
        </Box>
      </Flex>
      <Flex direction={["column", "column", "row"]}>
        <Box width={["100%", "100%", "75%"]}>
          <BranchSummary />
        </Box>
        <Box width={["100%", "100%", "25%"]}>
          {/* <BranchSummary /> */}
        </Box>
      </Flex>

      <Flex my="20px" justifyContent={["space-between"]}>
        <Box>
          <Text color={"#4A4C4F"} fontSize={["20px"]} fontWeight={["bold"]}>
            Branches
          </Text>
        </Box>
        <Box>
          <Dropdown />
        </Box>
      </Flex>
      <Box>
        <OrdersTable />
      </Box>
    </Box>
  );
};

// export default Orders;

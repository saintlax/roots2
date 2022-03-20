import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FilterBox } from './components/FilterBox';

import { TransactionTable } from "./components/TransactionTable";

const Transactions = () => {
  return (
    <Box>
      <Flex my="20px" justifyContent={["space-between"]}>
        <Box>
          <Text color={"#4A4C4F"} fontSize={["20px"]} fontWeight={["bold"]}>
            Transactions
          </Text>
        </Box>
        <Box>
          <FilterBox />
        </Box>
      </Flex>
      <Box>
        <TransactionTable />
      </Box>
    </Box>
  );
};

export default Transactions;

import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FilterBox } from './components/FilterBox';

import { MerchantsTable } from "./components/MerchantsTable";

const Marchants = () => {
  return (
    <Box>
      <Flex my="20px" justifyContent={["space-between"]}>
        <Box>
          <Text color={"#4A4C4F"} fontSize={["20px"]} fontWeight={["bold"]}>
            Marchants
          </Text>
        </Box>
        <Box>
          <FilterBox />
        </Box>
      </Flex>
      <Box>
        <MerchantsTable />
      </Box>
    </Box>
  );
};

export default Marchants;

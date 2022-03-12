import { Box, Button, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import Doghnut from '../products/components/Dognut';
import { BranchSummary } from './components/BranchSummary';
import { Dropdown } from './components/Dropdown';


import { OrdersTable } from "./components/OrdersTable";

export const Branches = () => {
  return (
    <Box pb={["50px"]}>
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
      <Flex
        direction={["column", "column", "row"]}
        justifyContent="space-between"
      >
        <Box width={["100%", "100%", "65%"]}>
          <BranchSummary />
        </Box>
        <Box
          p="20px"
          width={["100%", "100%", "33%"]}
          border="1px solid #c4c4c4"
          borderRadius={"10px"}
        >
          <Text as="h3">Branch Sales Analytics</Text>
          {/* <BranchSummary /> */}
          <Flex
            direction={["column", "row"]}
            justifyContent="flex-start"
            width="100%"
            my={["", "50px"]}
          >
            {/* <Stack width={"100%"}> */}

            <Flex
              justifyContent={"flex-start"}
              w={["100%", "300px", "70%"]}
              h={["100%", "", "220px"]}
              // mx={["auto"]}
            >
              <Doghnut />
            </Flex>
            <Box width={"30%"}>
              <UnorderedList
                fontSize={"12px"}
                // w="20%"
                styleType="disc"
                // display="flex"
                // flexDirection={["row", "column"]}
                // justifyContent={["space-between", "center"]}
                // alignItems={["center", "", "start"]}
                flexWrap="wrap"
              >
                <ListItem>
                  <Text as="span" pos="relative" left="-10px" top="-4px">
                    Total Order
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as="span" pos="relative" left="-10px" top="-4px">
                    Total Revenue
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
          </Flex>
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

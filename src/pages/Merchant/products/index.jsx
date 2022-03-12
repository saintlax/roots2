import { Box, Button, Flex, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ProductSummary } from './components/ProductSummary';
import { Dropdown } from './components/Dropdown';


import { OrdersTable } from "./components/OrdersTable";
import { GridView } from "./components/GridView";

import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai"
import Doghnut from './components/Dognut';

export const Products = () => {
  const [views, setViews] = useState(true)
  const view = views ? "List View" : "Grid View";
  return (
    <Box>
      <Flex my="20px" justifyContent={["space-between"]}>
        <Box>
          <Text color={"#4A4C4F"} fontSize={["20px"]} fontWeight={["bold"]}>
            Products Summary
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
          <ProductSummary />
        </Box>
        <Box
          p="20px"
          width={["100%", "100%", "33%"]}
          border="1px solid #c4c4c4"
          borderRadius={"10px"}
        >
          <Text as="h3">Product Sales Analytics</Text>
          {/* <BranchSummary /> */}
          <Flex direction={["column", "row"]} justifyContent="flex-start" width="100%" my={["", "50px"]}>
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

      <Box my="50px">
        <Flex my="20px" justifyContent={["space-between"]}>
          <Box>
            <Text color={"#4A4C4F"} fontSize={["20px"]} fontWeight={["bold"]}>
              Product Catalogue
            </Text>
          </Box>
          <Flex>
            <Button
              leftIcon={
                views ? <AiOutlineUnorderedList /> : <MdOutlineDashboard />
              }
              px="20px"
              bg="#1459DF"
              _hover={{ bg: "#1459DF" }}
              mr="10px"
              color="#fff"
              onClick={() => setViews(!views)}
            >
              {view}
            </Button>
            <Dropdown />
          </Flex>
        </Flex>
        <Box>{views ? <OrdersTable /> : <GridView />}</Box>
      </Box>
    </Box>
  );
};

// export default Orders;

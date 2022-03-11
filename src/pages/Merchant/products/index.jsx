import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ProductSummary } from './components/ProductSummary';
import { Dropdown } from './components/Dropdown';


import { OrdersTable } from "./components/OrdersTable";
import { GridView } from "./components/GridView";

import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai"

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
      <Flex direction={["column", "column", "row"]}>
        <Box width={["100%", "100%", "75%"]}>
          <ProductSummary />
        </Box>
        <Box width={["100%", "100%", "25%"]}>{/* <BranchSummary /> */}</Box>
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
              leftIcon={views ? <AiOutlineUnorderedList /> : <MdOutlineDashboard />}
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

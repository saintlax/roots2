import { Table, Box, Flex, Text } from "@chakra-ui/react";
import { TopProductTableBody } from "./TopProductTableBody";
import { TopProductTableHead } from "./TopProductTableHead";

export const ProductSummary = () => {
  return (
    <Box
      bg={"#fff"}
      borderRadius="20px"
      border={"1px solid #E5E5E5"}
      maxW={["100%", "100%"]}
      overflowX={["scroll", "scroll", "scroll", "hidden"]}
    >
      <Flex justifyContent={"space-between"} px="30px" pt="10px">
        <Text fontWeight={"semibold"}>Top Selling Products</Text>
        <Text fontWeight={"semibold"}>Last Week</Text>
      </Flex>
      <Table size="lg" variant="striped" colorScheme={"blackAlpha"}>
        <TopProductTableHead />
        <TopProductTableBody />
      </Table>
    </Box>
  );
};

import { Table, Box, Flex, Text } from "@chakra-ui/react";
import { TopBranchTableBody } from "./TopBranchTableBody";
import { TopBranchTableHead } from "./TopBranchTableHead";

export const BranchSummary = () => {
  return (
    <Box
      bg={"#fff"}
      borderRadius="20px"
      border={"1px solid #E5E5E5"}
      maxW={["100%", "100%"]}
      overflowX={["scroll", "scroll", "scroll", "hidden"]}
    >
      <Flex justifyContent={"space-between"} px="30px" pt="10px">
        <Text fontWeight={"semibold"}>Top Branch per Revenue</Text>
        <Text fontWeight={"semibold"}>Last Week</Text>
      </Flex>
      <Table size="lg" variant="striped" colorScheme={"blackAlpha"}>
        <TopBranchTableHead />
        <TopBranchTableBody />
      </Table>
    </Box>
  );
};

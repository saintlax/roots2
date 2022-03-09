import {
  Table,
  Box,
} from "@chakra-ui/react";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";

export const MerchantsTable = () => {
  return (
    <Box
      bg={"#fff"}
      borderRadius="20px"
      Box
      maxWidth={["100%"]}
      overflowX={["scroll", "scroll", "scroll", "hidden"]}
    >
      <Table size="md" variant="striped" colorScheme={"blackAlpha"}>
        <TableHead />
        <TableBody />
      </Table>
    </Box>
  );
}

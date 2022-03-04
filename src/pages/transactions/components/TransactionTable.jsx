import {
  Table,
  Box,
} from "@chakra-ui/react";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";

export const TransactionTable = () => {
  return (
    <Box bg={"#fff"} borderRadius="20px">
      <Table size="md">
        <TableHead />
        <TableBody />
      </Table>
    </Box>
  );
}

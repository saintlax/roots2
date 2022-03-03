import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { TableBody } from "./TableBody";
import { TableHead } from "./TableHead";

export const UsersTable = () => {
  return (
    <Box bg={"#fff"} borderRadius="20px">
      <Table size="md">
        <TableHead />
        <TableBody />
      </Table>
    </Box>
  );
}

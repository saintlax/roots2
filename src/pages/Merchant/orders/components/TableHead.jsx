import { Thead, Tr, Th } from "@chakra-ui/react";
import { tableHeadData } from "./tableHeadData";

export const TableHead = () => {
  return (
    <Thead>
      <Tr>
        {/* <Checkbox mt="35%" ml="35%" size="lg" colorScheme="orange" /> */}
        {tableHeadData.map((data, i) => {
          return (
            <Th
              key={i}
              fontSize={["14px"]}
              fontWeight="bold"
              textTransform="capitalize"
              py="25px !important"
              pr="20px !important"
            >
              {data}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};

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
              fontSize={["16px"]}
              fontWeight="bold"
              textTransform="capitalize"
              py="25px !important"
              px={["20px !important", "40px !important"]}
            >
              {data}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};

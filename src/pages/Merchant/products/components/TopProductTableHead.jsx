import { Thead, Tr, Th } from "@chakra-ui/react";
import { topProductTableHeadData } from "./tableHeadData";

export const TopProductTableHead = () => {
  return (
    <Thead>
      <Tr>
        {/* <Checkbox mt="35%" ml="35%" size="lg" colorScheme="orange" /> */}
        {topProductTableHeadData.map((data, i) => {
          return (
            <Th
              key={i}
              fontSize={["13px"]}
              fontWeight="bold"
              textTransform="capitalize"
              // py="25px !important"
              // px={["20px !important", "40px !important"]}
            >
              {data}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};

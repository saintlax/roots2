import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from "@chakra-ui/react";
import { tableBodyData } from "./tableBodyData";

import { BsThreeDots } from "react-icons/bs";
import { MenuLItems } from "./MenuList";

export const TableBody = () => {
  return (
    <Tbody>
        {tableBodyData.map((data, i) => {
          return (
            <Tr key={i}>
              <Td
                px={["20px !important", "40px !important"]}
                fontSize={["14px"]}
              >
                {data?.address}
                {/* <Checkbox size="lg" colorScheme="orange" defaultChecked /> */}
              </Td>
              <Td
                px={["20px !important", "40px !important"]}
                fontSize={["14px"]}
              >
                <Flex alignItems={"center"}>
                  <Text>{data?.address}</Text>
                </Flex>
              </Td>
              <Td
                px={["20px !important", "40px !important"]}
                fontSize={["14px"]}
              >
                {data?.name}
              </Td>
              <Td
                px={["20px !important", "40px !important"]}
                fontSize={["14px"]}
              >
                {data?.amount}
              </Td>
              <Td
                px={["20px !important", "40px !important"]}
                fontSize={["14px"]}
              >
                {data?.totalOrders}
              </Td>

              <Td
                px={["20px !important", "40px !important"]}
                fontSize={["14px"]}
              >
                <MenuLItems name={data?.name} dateCreated={data?.dateCreated} />
              </Td>
            </Tr>
          );
        })}
      
    </Tbody>
  );
};

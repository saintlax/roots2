import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox, Tooltip, Circle } from "@chakra-ui/react";
import { tableBodyData } from "./tableBodyData";

import { BsThreeDots } from "react-icons/bs";
import { MdHeadset } from "react-icons/md";
import { MenuLItems } from "./MenuList";

export const TableBody = () => {
  return (
    <Tbody>
        {tableBodyData.map((data, i) => {
          return (
            <Tr key={i}>
              <Tooltip label={data?.prodName}>
                <Td
                  px={["20px !important", "40px !important"]}
                  fontSize={["14px"]}
                >
                  <Flex alignItems={"center"}>
                    <Circle bg={"#fbf5ef"} size="30px" mr="10px">
                      <MdHeadset size={"16px"} />
                    </Circle>
                    <Text isTruncated>{data?.prodName}</Text>
                  </Flex>
                </Td>
              </Tooltip>
              <Tooltip label={data?.description}>
                <Td
                  px={["20px !important", "40px !important"]}
                  fontSize={["14px"]}
                >
                  <Flex alignItems={"center"}>
                    <Text>{data?.description}</Text>
                  </Flex>
                </Td>
              </Tooltip>
              <Tooltip label={data?.category}>
                <Td
                  px={["20px !important", "40px !important"]}
                  fontSize={["14px"]}
                >
                  {data?.category}
                </Td>
              </Tooltip>
              <Tooltip label={data?.address}>
                <Td
                  px={["20px !important", "40px !important"]}
                  fontSize={["14px"]}
                >
                  {data?.address}
                </Td>
              </Tooltip>
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
                {data?.amount}
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

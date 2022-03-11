import { Tr, Tbody, Td, Avatar, Flex, Text, Tooltip, Circle } from "@chakra-ui/react";
import { tableBodyData } from "./tableBodyData";
import { MdHeadset } from "react-icons/md";

// import { BsThreeDots } from "react-icons/bs";
// import { MenuLItems } from "./MenuList";

export const TopProductTableBody = () => {
  return (
    <Tbody>
        {tableBodyData.map((data, i) => {
          return (
            <Tr key={i}>
              <Td fontSize={["12px"]}>{i + 1}</Td>
              <Tooltip label={data?.prodName}>
                <Td fontSize={["12px"]}>
                  <Flex alignItems={"center"}>
                    <Circle bg={"#fbf5ef"} size="30px" mr="10px">
                      <MdHeadset size={"16px"} />
                    </Circle>
                    <Text isTruncated>{data?.prodName}</Text>
                  </Flex>
                </Td>
              </Tooltip>
              <Tooltip label={data?.amount}>
                <Td fontSize={["12px"]}>
                  <Text isTruncated>{data?.amount}</Text>
                </Td>
              </Tooltip>
              <Tooltip label={data?.totalOrders}>
                <Td isTruncated fontSize={["12px"]}>
                  {data?.totalOrders}
                </Td>
              </Tooltip>
              <Td fontSize={["12px"]}>{data?.amount}</Td>
            </Tr>
          );
        })}
      
    </Tbody>
  );
};

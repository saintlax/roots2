import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from "@chakra-ui/react";
import { tableBodyData } from "./tableBodyData";

// import { BsThreeDots } from "react-icons/bs";
import { MenuLItems } from "./MenuList";

export const TableBody = () => {
  return (
    <Tbody>
        {tableBodyData.map((data, i) => {
          return (
            <Tr key={i}>
              <Td>
                <Checkbox size="lg" colorScheme="orange" defaultChecked />
              </Td>
              <Td>
                <Flex alignItems={"center"}>
                  <Avatar size={"sm"} name={data?.name} src={data?.imageUrl} mr="5px" />
                  <Text>{data?.name}</Text>
                </Flex>
              </Td>
              <Td>{data?.email}</Td>
              <Td>{data?.loanAmount}</Td>
              <Td>{data?.date}</Td>
              <Td>
                <Text
                  color={
                    data?.status === "Accepted"
                      ? "#009A49"
                      : data?.status === "Rejected"
                      ? "#FF1A1A"
                      : "yellow"
                  }
                  bg={
                    data?.status === "Accepted"
                      ? "#F3FCF7"
                      : data?.status === "Rejected"
                      ? "#FFF4F4"
                      : "#fffcf4"
                  }
                  borderRadius={"5px"}
                  p="5px 8px"
                >
                  {data?.status}
                </Text>
              </Td>
              <Td>
                <MenuLItems name={data?.name} data={data} />
              </Td>
            </Tr>
          );
        })}
      
    </Tbody>
  );
};

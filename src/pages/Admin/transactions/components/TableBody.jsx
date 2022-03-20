import { Tr, Tbody, Td, Flex, Text, Checkbox } from "@chakra-ui/react";
import { tableBodyData } from "./tableBodyData";
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
                  {/* <Avatar size={"sm"} name={data?.name} src={""} mr="5px" /> */}
                  <Text>{data?.date}</Text>
                </Flex>
              </Td>
              <Td>{data?.description}</Td>
              <Td>{data?.name}</Td>
              <Td>{data?.amount}</Td>
              <Td>
                <Text
                  color={
                    data?.status === "Completed"
                      ? "#009A49"
                      : data?.status === "Rejected"
                      ? "red"
                      : "#FFC529"
                  }
                  bg={data?.status === "Completed" ? "#F3FCF7" : "#f4f4f4"}
                  borderRadius={"5px"}
                  p="5px 8px"
                >
                  {data?.status}
                </Text>
              </Td>
              <Td>
                <MenuLItems name={data?.name} dateCreated={data?.dateCreated} />
              </Td>
            </Tr>
          );
        })}
      
    </Tbody>
  );
};

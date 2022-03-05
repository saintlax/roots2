import { Flex, Select } from "@chakra-ui/react";
import { TiUpload } from "react-icons/ti"
import { BiCube, BiFilter } from "react-icons/bi"

export const FilterBox = () => {
  return (
    <Flex justifyContent={"space-between"}>
      <Flex
        width={"150px"}
        justifyContent="center"
        alignItems={"center"}
        bg="#fff"
        px="8px"
        borderRadius={"5px"}
        mr="10px"
      >
        <TiUpload size={26} />
        <Select placeholder="Export" border="none" _focus={{ border: "none" }}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
      <Flex
        width={"150px"}
        justifyContent="center"
        alignItems={"center"}
        bg="#fff"
        px="8px"
        borderRadius={"5px"}
        mr="10px"
      >
        <BiCube size={26} />
        <Select
          placeholder="Bulk action"
          border="none"
          _focus={{ border: "none" }}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
      <Flex
        width={"150px"}
        justifyContent="center"
        alignItems={"center"}
        bg="#fff"
        px="8px"
        borderRadius={"5px"}
      >
        <BiFilter size={26} />
        <Select
          placeholder="Filter by"
          border="none"
          _focus={{ border: "none" }}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
    </Flex>
  );
}
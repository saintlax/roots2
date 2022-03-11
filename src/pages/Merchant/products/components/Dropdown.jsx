import { Flex, Select } from "@chakra-ui/react";
import {
  BsBagCheck,
} from "react-icons/bs";

export const Dropdown = () => {
  return (
    <Flex
      width={"160px"}
      justifyContent="center"
      alignItems={"center"}
      bg="#fff"
      px="8px"
      borderRadius={"5px"}
    >
      <BsBagCheck size={26} />
      <Select
        placeholder="Categories"
        border="none"
        _focus={{ border: "none" }}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </Flex>
  );
} 
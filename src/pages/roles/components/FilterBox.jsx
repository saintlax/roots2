import { Flex, Select, useMediaQuery } from "@chakra-ui/react";
import { TiUpload } from "react-icons/ti";
import { BiCube, BiFilter } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { AddRolesModal } from "./AddRolesModal";

export const FilterBox = () => {
  const [isLargerThan600] = useMediaQuery("(max-width: 600px)");
  return (
    <Flex justifyContent={"space-between"}>
      <Flex
        display={["none", "flex"]}
        width={["50px", "100px", "120px", "150px"]}
        justifyContent={["center"]}
        alignItems={"center"}
        bg="#fff"
        px="8px"
        borderRadius={"5px"}
        mr="10px"
      >
        <TiUpload size={26} />
        <Select
          icon={
            isLargerThan600 ? (
              <TiUpload size={26} />
            ) : (
              <FiChevronDown size={18} />
            )
          }
          // iconColor={["grey", "transparent"]}
          placeholder="Export"
          border="none"
          _focus={{ border: "none" }}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        {/* <Box display={["none", "block"]}>
          <FiChevronDown size={18} />
        </Box> */}
      </Flex>
      <Flex
        display={["none", "flex"]}
        width={["50px", "100px", "120px", "150px"]}
        justifyContent="center"
        alignItems={"center"}
        bg="#fff"
        px="8px"
        borderRadius={"5px"}
        mr="10px"
      >
        <BiCube size={26} />
        <Select
          icon={
            isLargerThan600 ? <BiCube size={26} /> : <FiChevronDown size={18} />
          }
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
        width={["50px", "100px", "120px", "150px"]}
        justifyContent="center"
        alignItems={"center"}
        bg="#fff"
        px="8px"
        borderRadius={"5px"}
      >
        <BiFilter size={26} />
        <Select
          icon={
            isLargerThan600 ? (
              <BiFilter size={26} />
            ) : (
              <FiChevronDown size={18} />
            )
          }
          placeholder="Filter by"
          border="none"
          _focus={{ border: "none" }}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Flex>
      <Flex
        display={["flex", "none"]}
        bg="#1459df"
        width={["50px", "100px", "120px", "150px"]}
        justifyContent="center"
        alignItems={"center"}
        mx="8px"
        borderRadius={"5px"}
      >
        <AddRolesModal />
      </Flex>
    </Flex>
  );
};

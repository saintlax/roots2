import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Box,
  Flex,

  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";


export const AddRolesModal = ({ name, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        onClick={onOpen}
        alignItems="center"
        width={"100%"}
        justifyContent="center"
      >
        <AiOutlinePlus color="#fff" size={26} />
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody p="50px">
            <Flex
              width={"100%"}
              direction="column"
              // justifyContent="center"
              alignItems={"center"}
            >
              {/* <Avatar size="lg" name={data?.name} src={data?.imageUrl} /> */}
              <Text my="5px" fontSize={"20px"} fontWeight={"bold"}>
                Add Role
              </Text>
              {/* <Text>Account created {data?.dateCreated}</Text> */}
            </Flex>
            <Flex
              direction={["column"]}
              my={"20px"}
              justifyContent={"space-between"}
              // alignItems="center"
              fontWeight={"semibold"}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Akogwu Emmanuel" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input placeholder="akogwu@gmail.com" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Role Type</FormLabel>
                <Input placeholder="Vendor" />
              </FormControl>

              <Box my={4}>
                <FormLabel>Permissions</FormLabel>
                <Flex
                  border={"1px solid grey"}
                  p="10px"
                  wrap={"wrap"}
                  fontSize="12px"

                  // justifyContent="space-between"
                >
                  <Text
                    bg={"#f4f4f4"}
                    mb="5px"
                    py="5px"
                    px="8px"
                    borderRadius={"3px"}
                    mr="5px"
                    fontWeight={"normal"}
                  >
                    Edit Profile
                  </Text>
                  <Text
                    bg={"#f4f4f4"}
                    mb="5px"
                    py="5px"
                    px="8px"
                    borderRadius={"3px"}
                    mr="5px"
                    fontWeight={"normal"}
                  >
                    Add Products
                  </Text>
                  <Text
                    bg={"#f4f4f4"}
                    mb="5px"
                    py="5px"
                    px="8px"
                    borderRadius={"3px"}
                    mr="5px"
                    fontWeight={"normal"}
                  >
                    Manage Products
                  </Text>
                  <Text
                    bg={"#f4f4f4"}
                    mb="5px"
                    py="5px"
                    px="8px"
                    borderRadius={"3px"}
                    mr="5px"
                    fontWeight={"normal"}
                  >
                    Add Agents
                  </Text>
                </Flex>
              </Box>
              <Button fontWeight={"normal"} color={"#fff"} bg="#1459df" _hover={{  bg: "#1459df" }}>Add Role</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

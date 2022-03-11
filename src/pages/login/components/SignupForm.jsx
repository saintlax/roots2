import { Box, Button, Checkbox, Flex, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

export const SignupForm = ({ show, setShow, setPassword, setEmail, disable, handleLogin }) => {
  const NO_SHADOW = { _focus: { boxShadow: "none" } };
  const BTN_STYLE = {
    _hover: { bg: "rgba(20, 89, 223, 0.7)" },
    bg: "primary",
    color: "#fff",
  };
  const SM_SIZE = { fontSize: ".9rem" };
  const OUTLINE_COLOR = {
    _focus: { outline: "1px solid #614285" },
  };


  return (
    <Box width={"100%"} px={["3%", "5%", "15%"]}>
      {/* <VStack
        spacing="30px"
        alignItems="center"
        bg="#fff"
        p={["10"]}
        borderRadius="10px"
        width={["100%", "100%", "100%"]}
      > */}
      <Heading textAlign={["center"]} as={"h2"} fontSize={"30px"} mb="50px">
        Create your roots account
      </Heading>
      <Box>
        <FormLabel {...SM_SIZE} margin="10px 0">
          Business name
        </FormLabel>

        <Input
          width={"100%"}
          type="email"
          {...OUTLINE_COLOR}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Business name"
        />
      </Box>
      <Box>
        <FormLabel {...SM_SIZE} margin="10px 0">
          Email Address
        </FormLabel>

        <Input
          width={"100%"}
          type="email"
          {...OUTLINE_COLOR}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
      </Box>

      <Box>
        <FormLabel {...SM_SIZE} margin="10px 0">
          Phone
        </FormLabel>

        <Input
          width={"100%"}
          type="email"
          {...OUTLINE_COLOR}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter phone number"
        />
      </Box>

      <Box>
        <FormLabel {...SM_SIZE} margin="10px 0">
          Password
        </FormLabel>

        <InputGroup size="md">
          <Input
            // pr="4.5rem"
            width={"100%"}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            {...OUTLINE_COLOR}
          />
          <InputRightElement width="4.5rem">
            <Button
              {...NO_SHADOW}
              _hover={{ bg: "transparent" }}
              bg="transparent"
              h="1.75rem"
              // size="sm"
              onClick={() => setShow(!show)}
            >
              {show ? <FiEyeOff /> : <FiEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      {/* <Flex justifyContent={"space-between"} mt="20px">
        <Checkbox colorScheme="#C05621" defaultChecked>
          Remember me
        </Checkbox>
        <Text
          textAlign={"right"}
          _hover={{ textDecoration: "underline" }}
          fontSize="1rem"
        >
          <Link to="/forgot-password">forgot password?</Link>
        </Text>
      </Flex> */}
      <Button
        width={"100%"}
        my="30px"
        isDisabled={disable}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={handleLogin}
      >
        Create my account
      </Button>
      <Text
        textAlign={"center"}
        _hover={{ textDecoration: "underline" }}
        fontSize="1rem"
      >
        Have an account?
        <Link to="/login"> Sign in</Link>
      </Text>
      {/* </VStack> */}
    </Box>
  );
}
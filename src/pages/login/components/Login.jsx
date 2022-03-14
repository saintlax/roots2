import { Box, Button, Checkbox, Flex, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Login = ({ show, setShow, setPassword, setEmail, disable, handleLogin }) => {
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
      <Heading textAlign={["center"]} as={"h2"} fontSize={"30px"} mb="50px">
        Login to your Tap account
      </Heading>
      <div class="inputContainer">
        <input
          type="email"
          class="input"
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="email" class="label">
          Email Address
        </label>
      </div>
      <div class="inputContainer">
        <input
          type="text"
          class="input"
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <label for="password" class="label">
          Password
        </label>
      </div>
      <Flex justifyContent={"space-between"} mt="20px">
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
      </Flex>
      <Button
        width={"100%"}
        my="30px"
        isDisabled={disable}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Text
        textAlign={"center"}
        _hover={{ textDecoration: "underline" }}
        fontSize="1rem"
        mb="30px"
      >
        Dont have an account?
        <Link to="/signup"> Sign up</Link>
      </Text>
      {/* </VStack> */}
    </Box>
  );
}
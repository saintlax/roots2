import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa"
import { Success } from "./Success";

export const VerifyEmail = ({ success,setSuccess }) => {
   const NO_SHADOW = { _focus: { boxShadow: "none" } };
   const BTN_STYLE = {
     _hover: { bg: "rgba(20, 89, 223, 0.7)" },
     bg: "primary",
     color: "#fff",
   };
 
  return (
    <Box width={"100%"} px={["3%", "5%", "15%"]}>
      {success ? (
        <Success />
      ) : (
        <>
          <Heading textAlign={["center"]} as={"h2"} fontSize={"30px"} my="10px">
            Verify Email Address
          </Heading>
          <Text textAlign={"center"}>
            Check your email, an OTP Code has been sent to you.
          </Text>
          <Flex justifyContent={"center"} alignItems="center" my="30px">
            <FaEnvelopeOpenText size={100} color="#88C5FC" />
          </Flex>

          <div class="inputContainer">
            <input type="text" class="input" placeholder="" />
            <label for="" class="label">
              Enter OTP
            </label>
          </div>
          <Flex justifyContent={"space-between"} mt="20px">
            <Text color={"#4A4C4F"}>Didn’t get OTP Code, resend in 0.54s</Text>
            <Text
              color={"#4A4C4F"}
              textAlign={"right"}
              _hover={{ textDecoration: "underline" }}
              fontSize="0.9rem"
            >
              <Link to="/forgot-password">Resend OTP</Link>
            </Text>
          </Flex>
          <Button
            width={"100%"}
            my="30px"
            // isDisabled={disable}
            {...NO_SHADOW}
            {...BTN_STYLE}
            onClick={() => setSuccess(true)}
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
}
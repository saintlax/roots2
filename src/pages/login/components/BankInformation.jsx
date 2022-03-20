import { Box, Button, Flex, Heading,  Text } from "@chakra-ui/react";
import {  useNavigate } from "react-router-dom";

import { Success } from "./Success";


import bgImage from "../assets/background.png";
import { useState } from "react";

export const BankInformation = ({ setup, setSetup }) => {

   const [successPage, setSuccessPage] = useState(false);
  const navigate = useNavigate();
  const NO_SHADOW = { _focus: { boxShadow: "none" } };
  const BTN_STYLE = {
    _hover: { bg: "rgba(20, 89, 223, 0.7)" },
    bg: "primary",
    color: "#fff",
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      // bg="primary"
      alignItems={"center"}
      direction={["column", "column", "row"]}
    >
      <Box
        width={["100%", "100%", "50%"]}
        h={["50%", "50%", "100vh"]}
        backgroundImage={bgImage}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        padding={["20px", "50px"]}
      >
        <Box position={"relative"} height="100%">
          <Box position={"absolute"} bottom="0%">
            <Heading as="h3" color={"#fff"} mb="10px">
              Register your store on Roots
            </Heading>
            <Text color={"#fff"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              condimentum risus, eget in at rhoncus vitae. Enim in ullamcorper
              ut pulvinar. Interdum cursus nibh quam elit nunc donec neque.{" "}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box width={["100%", "100%", "50%"]} px={["3%", "5%", "8%"]} pb="20px">
        {successPage ? (
          <Success title="Account Setup Complete" btnDisplay="none" text="Your account has been set up successfully" />
        ) : (
          <>
            <Heading
              textAlign={["center"]}
              as={"h2"}
              fontSize={"30px"}
              my={["20px", "50px"]}
            >
              Bank Information
            </Heading>

            <div class="inputContainer">
              <input
                type=""
                class="input"
                placeholder=""
                style={{ position: "absolute", right: "-20%" }}
              />
              <label for="" class="label">
                Add Account Number
              </label>
            </div>
            <div class="inputContainer">
              <input type="text" class="input" placeholder="" />
              <label for="" class="label">
                Bank Name
              </label>
            </div>

            <Button
              width={"100%"}
              my="30px"
              // isDisabled={disable}
              {...NO_SHADOW}
              {...BTN_STYLE}
              onClick={() => setSuccessPage("true")}
            >
              Continue
            </Button>
            <Text
              cursor={"pointer"}
              onClick={() => navigate("/dashboard")}
              textAlign={"center"}
            >
              Skip for Now
            </Text>
          </>
        )}
      </Box>
    </Flex>
  );
};

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { Success } from "./Success";

export const AccountSetup = ({ setup, setSetup }) => {
  const NO_SHADOW = { _focus: { boxShadow: "none" } };
  const BTN_STYLE = {
    _hover: { bg: "rgba(20, 89, 223, 0.7)" },
    bg: "primary",
    color: "#fff",
  };

  return (
    <Box width={"100%"} px={["3%", "5%", "15%"]}>
     
          <Heading textAlign={["center"]} as={"h2"} fontSize={"30px"} my="10px">
            Account Setup
          </Heading>

          <div class="inputContainer">
            <input type="text" class="input" placeholder="" />
            <label for="" class="label">
              CAC Documents
            </label>
          </div>
          <div class="inputContainer">
            <input type="text" class="input" placeholder="" />
            <label for="" class="label">
              Headquarters Address
            </label>
          </div>
          <div class="inputContainer">
            <input type="number" class="input" placeholder="Branches" />
            <label for="" class="label">
              No of Branches
            </label>
          </div>
          
          <Button
            width={"100%"}
            my="30px"
            // isDisabled={disable}
            {...NO_SHADOW}
            {...BTN_STYLE}
            onClick={() => Navigate("/")}
          >
            Continue
          </Button>
          <Text textAlign={"center"}>Skip for Now</Text>
    
    </Box>
  );
};

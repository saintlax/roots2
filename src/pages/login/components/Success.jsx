import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom";
import { VscPass } from "react-icons/vsc";

export const Success = () => {
     const NO_SHADOW = { _focus: { boxShadow: "none" } };
     const BTN_STYLE = {
       _hover: { bg: "rgba(20, 89, 223, 0.7)" },
       bg: "primary",
       color: "#fff",
     };

     const navigate = useNavigate()

  return (
    <Box width={"100%"}>
      <Heading textAlign={["center"]} as={"h2"} fontSize={"30px"} my="10px">
        Email Verified
      </Heading>
      <Text textAlign={"center"}>
        Your account has been created successfully
      </Text>
      <Flex justifyContent={"center"} alignItems="center" my="30px">
        <VscPass size={100} color="#5FD788" />
      </Flex>

      <Flex direction={"column"} justifyContent={"space-between"} mt="20px">
        <Button
          width={"100%"}
          my="10px"
          fontWeight="normal"
          // isDisabled={disable}
          {...NO_SHADOW}
          {...BTN_STYLE}
          // onClick={() => setSuccess(true)}
        >
          Complete Account Setup
        </Button>
        <Button
          variant={"outline"}
          width={"100%"}
          my="10px"
          colorScheme={"grey"}
          fontWeight="normal"
          // isDisabled={disable}

          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </Flex>
    </Box>
  );
}
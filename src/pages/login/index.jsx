import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Box,
  Text,
  VStack,
  Center,
  FormLabel,
  Flex,
  Image,
  Heading,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/userAuthContext/userTypeContext";

import bgImage from "./assets/background.png";
import { Login } from "./components/Login";

const Index = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const { setUserType } = useContext(Context);

  const handleLogin = () => {
    if (email && password) {
      setUserType(email.toLowerCase() === "admin" ? "admin" : "merchant");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    email && password ? setIsDisable(false) : setIsDisable(true);
  }, [email, password]);

  return (
    <Flex
      w="100%"
      h={["100%"]}
      // bg="primary"
      alignItems={"center"}
      direction={["column", "column", "row"]}
    >
      <Box
        width={["100%", "100%", "50%"]}
        h={["50vh", "50vh", "100vh"]}
        backgroundImage={bgImage}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        padding={["20px", "50px"]}
      >
        <Box position={"relative"} height="100%">
          <Box position={"absolute"} bottom="0%">
            <Heading fontSize={["22px", "24px", "36px"]} as="h3" color={"#fff"} mb="10px">
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
      <Box width={["100%", "100%", "50%"]}>
        <Login
          show={show}
          setShow={setShow}
          setPassword={setPassword}
          setEmail={setEmail}
          disable={disable}
          handleLogin={handleLogin}
        />
      </Box>
    </Flex>
  );
};

export default Index;

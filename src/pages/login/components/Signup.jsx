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
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../context/userAuthContext/userTypeContext";

import bgImage from "../assets/background.png";
import { SignupForm } from "./SignupForm";
import { VerifyEmail } from "./VerifyEmail";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const { setUserType } = useContext(Context);
  
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [success, setSuccess] = useState(false);

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
      h="100vh"
      // bg="primary"
      alignItems={"center"}
      direction={["column", "column", "row"]}
    >
      <Box width={["100%", "100%", "50%"]}>
        <Image src={bgImage} alt="background image" />
      </Box>

      <Box width={["100%", "100%", "50%"]}>
        {verifyEmail ? (
          <>
            <VerifyEmail setSuccess={setSuccess} success={success} />
          </>
        ) : (
          <SignupForm
            show={show}
            setShow={setShow}
            setPassword={setPassword}
            setEmail={setEmail}
            disable={disable}
            handleLogin={handleLogin}
            setVerifyEmail={setVerifyEmail}
          />
        )}
      </Box>
    </Flex>
  );
};

export default Signup;
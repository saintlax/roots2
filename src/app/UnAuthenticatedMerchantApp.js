import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Merchant/login";
import { PUBLIC_PATHS } from "./merchantConstants";

export default function UnAuthenticatedMerchantApp() {
  const { LOGIN } = PUBLIC_PATHS;
  return (
    <ChakraProvider>
      <Routes>
        <Route path={LOGIN} exact component={Login} />
      </Routes>

      {/* <Redirect from="/*" to={LOGIN} /> */}
    </ChakraProvider>
  );
}

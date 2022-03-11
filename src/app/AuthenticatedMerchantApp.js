import React, { useEffect, useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PROTECTED_PATHS } from "./merchantConstants";
// import { Navigation } from "../components/nav"
import { Dashboard } from "../pages/Merchant/dashboard";
import { Orders } from "../pages/Merchant/orders";
import { Products } from "../pages/Merchant/products";
import { Branches } from "../pages/Merchant/branches";
import { Notifications}  from "../pages/Merchant/notifications";
import { Nav } from "../components/nav";
// import Review from "../pages/review"
// import { Index } from "../pages/settings/"

const AuthenticatedMerchantApp = () => {
  const [toggleSide, setToggleSide] = useState(false);
  const [showSidebar] = useState(true);
  const [isMobileScreen] = useMediaQuery("(max-width: 600px)");

  const {
    DASHBOARD,
    ORDERS,
    PRODUCTS,
    BRANCHES,
    // EMERGENCY,
    // LOCATION,
    NOTIFICATIONS,
    // REVIEW,
    // SETTINGS,
    // STAFF,
  } = PROTECTED_PATHS;

  const handleToggle = () => {
    setToggleSide((initial) => !initial);
  };

  useEffect(() => {
    if (isMobileScreen) {
      setToggleSide((initial) => !initial);
    }
  }, [isMobileScreen]);
  return (
    // <Router>
      <ChakraProvider>
        <Nav />
        <Box className="App" justifyContent={"center"} display="flex">
          <Box className={"app-container"}>
            {/* <Box
            className="app-sidebar"
            display={`${toggleSide ? "none" : "block"}`}
          >
            {showSidebar ? <SideBar toggle={handleToggle} /> : ""}
          </Box> */}
            {/* app right */}
            <Box w="100%" h="100%">
              {/* <Navigation
              toggle={handleToggle}
              SideBarActive={toggleSide}
              showSidebar={showSidebar}
            /> */}
              <Box
                width="100%"
                maxWidth="100%"
                mt="40px"
                padding={["5px", "10px", "20px"]}
              >
                <Routes>
                  <Route path={"/"} exact element={<Dashboard />} />
                  <Route path={BRANCHES} exact element={<Branches />} />
                  <Route path={DASHBOARD} exact element={<Dashboard />} />
                  <Route path={ORDERS} exact element={<Orders />} />
                  <Route path={PRODUCTS} exact element={<Products />} />
                  <Route
                    path={NOTIFICATIONS}
                    exact
                    element={<Notifications />}
                  />
                  {/* <Route path={STAFF} exact component={Staff} />
                <Route path={LOCATION} exact component={Location} />
                <Route path={DEPARTMENT} exact component={Department} />
                <Route path={EMERGENCY} exact component={Emergency} />
                <Route path={REVIEW} exact component={Review} />
                <Route path={SETTINGS} exact component={Index} /> */}
                  {/* <Redirect from="/*" to={DASHBOARD} /> */}
                </Routes>
              </Box>
            </Box>
          </Box>
        </Box>
      </ChakraProvider>
    // </Router>
  );
};

export default AuthenticatedMerchantApp;

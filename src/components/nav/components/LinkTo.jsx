import { NavLink } from "react-router-dom"
import { Flex, useMediaQuery, Img, Box, Text } from "@chakra-ui/react"
// import { useSelector } from "react-redux"
export const LinkTo = ({
  type,
  to,
  classname,
  iconComponent=null,
  btn,
  title,
  toggle,
}) => {
  const [isMobileScreen] = useMediaQuery("(max-width: 600px)")
  // const getBrandColor = useSelector(state => state.auth?.brandColor)

  const handleLogout = () => {
    localStorage.removeItem("11#221#")
    window.location.replace(`/${type}/login`)
  }

  return btn ? (
    <Flex
      direction={"row"}
      width="100%"
      _hover={{
        cursor: "pointer",
        background: "#f2f2f2",
        borderTopLeftRadius: 40,
        fontWeight: "700",
        color: "black",
        borderBottomLeftRadius: 40,
        flex: " 1 0 auto",
      }}
      fontWeight="700"
      onClick={handleLogout}
      className={`${classname} link`}
    >
      <Box>{iconComponent}</Box>
      {/* <img src={iconComponent} alt="icon" /> */}
      <Text>{title}</Text>
    </Flex>
  ) : (
    <NavLink
    style={{fontSize: "16px" }}
   
      className={`${classname} link`}
      onClick={() => (isMobileScreen ? toggle() : null)}
      target={title === "Guest CheckIn" ? "_blank" : ""}
      to={to ? to : "/"}
    >
      <Flex alignItems={"center"} justifyContent="space-between" fontSize={["12px", "14px", "16px", "18px"]}>
        <Box mr="10px">{iconComponent}</Box>
        {/* <img src={iconComponent} alt="icon" /> */}
        <Text>{title}</Text>
      </Flex>
    </NavLink>
  );
}

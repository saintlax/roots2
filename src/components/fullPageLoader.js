import { Flex, Spinner } from "@chakra-ui/react"
import { useSelector } from "react-redux"

export default function FullPageLoader({ bg, h }) {
  const getBrandColor = useSelector(state => state.auth?.brandColor)
  return (
    <Flex
      bg={bg ? bg : "#E5E5E5"}
      justifyContent="center"
      alignItems="center"
      height={h ? h : "100vh"}
      width="100%"
    >
      <Spinner color={getBrandColor} w="50px" h="50px" speed="0.65s" />
    </Flex>
  )
}

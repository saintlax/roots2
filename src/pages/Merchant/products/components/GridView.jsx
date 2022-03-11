import { Box, Flex } from "@chakra-ui/react";
import { Catalogue } from "./Catalogue";

export const GridView = () => {
  const gridCards = [<Catalogue />, <Catalogue />, <Catalogue />, <Catalogue />];

  return (
    <Flex
      direction={["column", "column", "row"]}
      justifyContent={["space-between"]}
      py="30px"
      wrap={"wrap"}
    >
      {gridCards.map((card, i) => {
        return (
          <Box width={["32%"]} key={i} mb="20px">
            {card}
          </Box>
        );
      })}
    </Flex>
  );
};

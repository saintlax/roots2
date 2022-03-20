import { Box, Flex } from '@chakra-ui/react';
import { Catalogue } from './Catalogue';

export const GridView = () => {
  const gridCards = [
    <Catalogue />,
    <Catalogue />,
    <Catalogue />,
    <Catalogue />,
    <Catalogue />,
  ];

  return (
    <Flex gap='10' justifyContent={['space-evenly']} py='30px' wrap={'wrap'}>
      {gridCards.map((card, i) => {
        return <Box key={i}>{card}</Box>;
      })}
    </Flex>
  );
};

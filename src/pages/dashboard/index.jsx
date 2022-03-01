import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Card from './components/Card';
import { cardData } from './components/cardData';

const Dashboard = () => {
  return (
    <Box>
      <Flex className='cards-container' gap='5'>
        {cardData.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </Flex>
    </Box>
  );
};

export default Dashboard;

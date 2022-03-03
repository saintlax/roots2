import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Card from './components/Card';
import { cardData } from './components/cardData';
import './index.css';

const Dashboard = () => {
  return (
    <Box className='dashboard-grid'>
      {/* <Stack> */}
      <Flex className='cards-container' gap={['6', '', '', 10, 12]}>
        {cardData.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </Flex>
      {/* </Stack> */}
      {/* <Stack
        className='graph-chart'
        color='#fff'
        w='880px'
        h='400px'
        bg='darkGray'
      >
        <Text as='h3'>Transactions Overview</Text>
      </Stack>
      <Stack className='recent-activities' color='#fff' bg='darkGray'>
        <Text as='h3'>Recent Activities</Text>
      </Stack> */}
    </Box>
  );
};

export default Dashboard;

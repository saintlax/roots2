import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Card from './components/Card';
import { cardData } from './components/cardData';
import GraphChart from './components/GraphChart';
import RecentActivities from './components/RecentActivities';
import './index.css';

const Dashboard = () => {
  return (
    <Box className='dashboard-grid'>
      {/* <Stack> */}
      {/* <Flex className='cards-container' gap={['6', '', '', 10, 12]}> */}
      {cardData.map((card) => (
        <Card key={card.id} {...card} />
      ))}
      {/* </Flex> */}
      {/* </Stack> */}
      <Stack className='graph-chart'>
        <Text as='h3'>Transactions Overview</Text>
        <GraphChart />
      </Stack>
      <Stack className='recent-activities' color='#fff'>
        <Text as='h3'>Recent Activities</Text>
        <RecentActivities />
      </Stack>
    </Box>
  );
};

export default Dashboard;

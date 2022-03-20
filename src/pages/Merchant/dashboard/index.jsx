import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import FilterParameter from './components/FilterParameter';
import Card from './components/Card';
import { cardData } from './components/cardData';
import './merchantDashboard.css';
import BranchPerRevenue from './components/BranchPerRevenue';
import ProductAnalytics from './components/ProductAnalytics';


export const Dashboard = () => {
  return (
    <Stack py='5' w='100%' h='100%' spacing='30px !important'>
      <FilterParameter />

      <Box className='merchant-dashboard-grid'>
        {cardData.map((data, index) => (
          <Card key={index} {...data} />
        ))}

        <Box className='branch-per-revenue-wrapper'>
          <BranchPerRevenue />
        </Box>
        <Box className='product-analytics'>
          <ProductAnalytics />
        </Box>
      </Box>
 
    </Stack>
  );
};

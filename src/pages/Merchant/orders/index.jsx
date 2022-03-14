import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Dropdown } from './components/Dropdown';
import { OrdersTable } from './components/OrdersTable';

export const Orders = () => {
  return (
    <Box width={'100%'}>
      <Flex my='20px' justifyContent={['space-between']}>
        <Box>
          <Text color={'#4A4C4F'} fontSize={['20px']} fontWeight={['bold']}>
            Order list
          </Text>
        </Box>
        <Box>
          <Dropdown />
        </Box>
      </Flex>
      <Box width={'100%'}>
        <OrdersTable />
      </Box>
    </Box>
  );
};

// export default Orders;

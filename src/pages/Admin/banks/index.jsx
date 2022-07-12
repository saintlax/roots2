import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { AddBankModal } from './components/AddBankModal';
import { BanksTable } from './components/BanksTable';

const Banks = () => {
  return (
    <Box>
      <Flex my='20px' justifyContent={['space-between']}>
        <Box>
          <Text color={'#4A4C4F'} fontSize={['20px']} fontWeight={['bold']}>
            Banks
          </Text>
        </Box>
        <Box>
          {/* <AddBankModal /> */}
        </Box>
      </Flex>
      <Box>
        <BanksTable />
      </Box>
    </Box>
  );
};

export default Banks;

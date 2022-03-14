import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { FilterBox } from './components/FilterBox';
import { RolesTable } from './components/RolesTable';

const Roles = () => {
  return (
    <Box>
      <Flex my='20px' justifyContent={['space-between']}>
        <Box>
          <Text color={'#4A4C4F'} fontSize={['20px']} fontWeight={['bold']}>
            Roles
          </Text>
        </Box>
        <Box>
          <FilterBox />
        </Box>
      </Flex>
      <Box>
        <RolesTable />
      </Box>
    </Box>
  );
};

export default Roles;

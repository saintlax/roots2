import { HStack, Select, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const FilterParameter = () => {
  return (
    <HStack justify='space-between' w='100%'>
      <Stack>
        <Text as='h2'>Hello Kelvin,</Text>
        <Text as='small' fontSize='14px'>
          Welcome to your Dashboard
        </Text>
      </Stack>

      <Select
        size='sm'
        w='100px'
        borderRadius={'5'}
        fontWeight={'700'}
        bg='#DEF3F4'
        color='blue'
        // ml='auto'
      >
        {filterParameter.map((parameter, i) => {
          return <option key={i}>{parameter}</option>;
        })}
      </Select>
    </HStack>
  );
};

export default FilterParameter;

const filterParameter = ['Today', 'Yesterday', 'Last 7 days'];

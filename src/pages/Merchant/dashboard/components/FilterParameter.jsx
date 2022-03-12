import { Flex, HStack, Select, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';

const FilterParameter = () => {
  return (
    <HStack justify='space-between' w='100%'>
      <Stack>
        <Text as='h2'>Hello Kelvin,</Text>
        <Text as='small' fontSize='14px'>
          Welcome to your Dashboard
        </Text>
      </Stack>
      <Flex
        pl='3'
        bg='#fff'
        align={'center'}
        border='2px solid #eee '
        borderRadius={'5'}
      >
        <AiOutlineCalendar size={26} />
        <Select border='none'>
          {filterParameter.map((parameter, i) => {
            return <option key={i}>{parameter}</option>;
          })}
        </Select>
      </Flex>
    </HStack>
  );
};

export default FilterParameter;

const filterParameter = ['Last 7 days', 'Today', 'Yesterday'];

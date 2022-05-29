import { Flex, HStack, Select, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const FilterParameter = ({ onFilter }) => {
  const user = useSelector((state) => state.user);
  const handleSelection = (e) => {
    onFilter(e.target.selectedOptions[0].value);
  };
  return (
    <HStack justify='space-between' w='100%'>
      <Stack>
        <Text as='h2'>Hello {user?.firstName},</Text>
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
        <Select border='none' onChange={(e) => handleSelection(e)}>
          {filterParameter.map((parameter, i) => {
            return <option key={i}>{parameter}</option>;
          })}
        </Select>
      </Flex>
    </HStack>
  );
};

export default FilterParameter;

const filterParameter = [
  'Last 7 days',
  'Today',
  'Yesterday',
  'Last month',
  'Last 6 months',
  'Last Year',
  'Last 2 Years',
  'Last 5 Years',
];

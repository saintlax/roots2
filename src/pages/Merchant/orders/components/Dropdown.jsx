import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';

export const Dropdown = ({ onFilter }) => {
  const handleSelection = (e) => {
    onFilter(e.target.selectedOptions[0].value);
  };
  return (
    <Flex
      width={'160px'}
      justifyContent='center'
      alignItems={'center'}
      bg='#fff'
      px='8px'
      borderRadius={'5px'}
    >
      <BsBagCheck size={26} />
      <Select
        onChange={(e) => handleSelection(e)}
        border='none'
        _focus={{ border: 'none' }}
      >
        {filterParameter.map((parameter, i) => {
          return <option key={i}>{parameter}</option>;
        })}
      </Select>
    </Flex>
  );
};

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

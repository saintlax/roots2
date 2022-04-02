import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';

export const Dropdown = ({ onStatusSelected }) => {
  const handleSelect = (e) => {
    onStatusSelected(e.target.value);
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
        placeholder='Status'
        border='none'
        _focus={{ border: 'none' }}
        onChange={(e) => handleSelect(e)}
      >
        <option value='Active'>Active</option>
        <option value='Inactive'>Inactive</option>
      </Select>
    </Flex>
  );
};

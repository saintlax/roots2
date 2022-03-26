import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';

export const Dropdown = () => {
  const productCategories = useSelector((state) => state.productCategories);
  const [category, setCategory] = useState('');

  return (
    <Flex
      // width={'160px'}
      justifyContent='center'
      alignItems={'center'}
      bg='#fff'
      px='8px'
      borderRadius={'5px'}
    >
      <BsBagCheck size={26} />
      <Select
        size='sm'
        placeholder='Categories'
        border='none'
        _focus={{ border: 'none' }}
      >
        {productCategories.map((category, i) => {
          return <option value={category.name}>{category.name}</option>;
        })}
      </Select>
    </Flex>
  );
};

import React from 'react';
import { Select } from '@chakra-ui/react';

export default function BarchartFilter() {
  return (
    <Select
      size='sm'
      w='150px'
      borderRadius={'5'}
      fontWeight={'700'}
      bg='#DEF3F4'
      color='blue'
      ml='auto'
    >
      {FilterParameter.map((parameter, i) => {
        return <option key={i}>{parameter}</option>;
      })}
    </Select>
  );
}

const FilterParameter = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

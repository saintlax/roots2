import React from 'react';
import { Select } from '@chakra-ui/react';

export default function BarchartFilter() {
  const yearsDropdown = () => {
    let years = [];
    const currentYear = new Date().getFullYear();
    let i = 0;
    while (i < currentYear) {
      const year = currentYear - i;
      years = [...years, year];
      if (i === 4) {
        break;
      }
      i++;
    }
    return years;
  };
  const handleSelect = (e) => {
    alert(e.target.value);
  };
  return (
    <Select
      size='sm'
      w='150px'
      borderRadius={'5'}
      fontWeight={'700'}
      bg='#DEF3F4'
      color='blue'
      ml='auto'
      onChange={(e) => handleSelect(e)}
    >
      {yearsDropdown().map((parameter, i) => {
        return <option key={i}>{parameter}</option>;
      })}
    </Select>
  );
}

// const FilterParameter = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';
import { useSelector } from 'react-redux';
export const CategoryDropdown = ({ onCategorySelected }) => {
  const productCategories = useSelector((state) => state.productCategories);

  const handleSelection = (e) => {
    onCategorySelected(e.target.selectedOptions[0].value);
  };

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
        // value={category}
        onChange={(e) => handleSelection(e)}
      >
        {productCategories.map((category, i) => {
          return <option value={category.name}>{category.name}</option>;
        })}
      </Select>
    </Flex>
  );
};

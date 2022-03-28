import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
export const Dropdown = () => {
  const productCategories = useSelector((state) => state.productCategories);
  const sortCategory = useSelector((state) => state.sortCategory);
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const tempProducts = useSelector((state) => state.products.temp);

  const [hasTemp, setHasTemp] = useState(false);

  const handleSelection = (e) => {
    const cat = e.target.selectedOptions[0].value;
    if (!hasTemp) {
      dispatch({
        type: ActionTypes.CREATE_TEMP_PRODUCTS,
        payload: products,
      });
    }
    setHasTemp(true);
    if (cat) {
      console.log('TEMP', tempProducts);
      const arr = tempProducts.filter((product) => product.category === cat);

      console.log('ARRay', arr);
      dispatch({
        type: ActionTypes.REFRESH_PRODUCTS,
        payload: arr,
      });
    } else {
      // last item inthe array contains another list from duplicates
      let count = 0;
      let array = [];
      tempProducts.forEach((element) => {
        if (count !== tempProducts.length - 1) {
          array.push(element);
        }
        count++;
      });
      dispatch({
        type: ActionTypes.REFRESH_PRODUCTS,
        payload: array,
      });
    }
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

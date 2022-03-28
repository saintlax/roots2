import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
export const BranchesDropdown = ({ hasTemp, onHasTemp }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const tempProducts = useSelector((state) => state.products.temp);
  const branches = useSelector((state) => state.branches);

  const handleSelection = (e) => {
    const cat = e.target.selectedOptions[0].value;
    console.log('branch id', cat);
    if (!hasTemp) {
      dispatch({
        type: ActionTypes.CREATE_TEMP_PRODUCTS,
        payload: products,
      });
    }
    onHasTemp(true);
    if (cat) {
      console.log('TEMP', tempProducts);
      const arr = tempProducts.filter((product) => product.branchId == cat);

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
        placeholder='Branches'
        border='none'
        _focus={{ border: 'none' }}
        onChange={(e) => handleSelection(e)}
      >
        {branches.map((branch, i) => {
          return <option value={branch.id}>{branch.name}</option>;
        })}
      </Select>
    </Flex>
  );
};

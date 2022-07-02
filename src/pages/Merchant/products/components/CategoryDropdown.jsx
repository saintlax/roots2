import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';
import { useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
export const CategoryDropdown = ({ onCategorySelected }) => {
  const productCategories = useSelector((state) => state.productCategories);
  const merchant = useSelector((state) => state.merchant);
  const userBranch = useSelector((state) => state.userBranch);
  const dispatch = useDispatch();
  const handleSelection = (e) => {
    onCategorySelected(e.target.selectedOptions[0].value);
  };

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    //&branchId=${this.branch.id
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `${userBranch.merchantId}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      query = `${merchant.id}`;
    }
    await Axios.get(
      `${REACT_APP_API_URL}/productCategories`///filter/filter?merchantId=${query}
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_PRODUCT_CATEGORIES, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

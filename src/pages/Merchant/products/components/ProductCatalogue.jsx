import { Box, Button, Flex, Text, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';
import { OrdersTable } from './OrdersTable';
import { GridView } from './GridView';
import { CategoryDropdown } from './CategoryDropdown';
import { AddCategoryModal } from './AddCategoryModal';
import { BranchesDropdown } from './BranchesDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import { AddProductModal } from './AddProductModal';
const ProductCatalogue = ({ isMobile, userMerchant }) => {
  const [views, setViews] = useState(true);
  const view = views ? 'List View' : 'Grid View';
  const [hasTemp, setHasTemp] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const tempProducts = useSelector((state) => state.products.temp);
  const [selectedBranchId, setSelectedBranchId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  //since i am creating a temporary array in the redux store, i want to reuse this for branch sorting
  const onHasTemp = (status) => {
    setHasTemp(status);
  };
  const onBranchIdSelected = (branch) => {
    const branchId = branch.id;
    setSelectedBranchId(branchId);
    filterProducts(branchId, selectedCategory);
  };

  const filterProducts = (branchId, catName) => {
    if (!hasTemp) {
      dispatch({
        type: ActionTypes.CREATE_TEMP_PRODUCTS,
        payload: products,
      });
    }
    setHasTemp(true);

    console.log('TEMP', tempProducts);
    let arr = [];
    if (branchId !== '' && catName === '') {
      arr = tempProducts.filter((product) => product.branchId == branchId);
      console.log('ARRay', arr);
      dispatch({
        type: ActionTypes.REFRESH_PRODUCTS,
        payload: arr,
      });
    } else if (branchId === '' && catName !== '') {
      arr = tempProducts.filter((product) => product.category === catName);
      console.log('ARRay', arr);
      dispatch({
        type: ActionTypes.REFRESH_PRODUCTS,
        payload: arr,
      });
    } else if (branchId !== '' && catName !== '') {
      arr = tempProducts.filter(
        (product) =>
          product.category === catName && product.branchId == branchId
      );
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

  const onCategorySelected = (name) => {
    setSelectedCategory(name);
    filterProducts(selectedBranchId, name);
  };

  return (
    <Box>
      <Flex
        py='5'
        gap='3'
        direction={['column', '', 'row']}
        justify='space-between'
        align={['start', '']}
      >
        <Text as='h2'>Product Catalogue</Text>
        <Flex w={['100%', '', 'auto']} justify={['space-between']} gap='3'>
          <Button
            leftIcon={
              views ? <AiOutlineUnorderedList /> : <MdOutlineDashboard />
            }
            size='sm'
            bg='#1459DF'
            _hover={{ bg: '#1459DF' }}
            mr='10px'
            color='#fff'
            onClick={() => setViews(!views)}
          >
            {view}
          </Button>
          <BranchesDropdown onBranchIdSelected={onBranchIdSelected} />
          <CategoryDropdown onCategorySelected={onCategorySelected} />
          {isMobile ? (
            <Button size='sm' bg='primary'>
              <AddProductModal
                isMobile={isMobile}
                userMerchant={userMerchant}
              />
            </Button>
          ) : (
            <Button size='sm' bg={'#1459DF'} color='#fff'>
              <AddProductModal
                isMobile={isMobile}
                userMerchant={userMerchant}
              />
            </Button>
          )}

          {/* {isMobile ? (
            <Button size='sm' bg='primary'>
              <AddCategoryModal isMobile={isMobile} />
            </Button>
          ) : (
            <Button size='sm' bg={'#1459DF'} color='#fff'>
              <AddCategoryModal isMobile={isMobile} />
            </Button>
          )} */}
        </Flex>
      </Flex>
      <Box>{views ? <OrdersTable /> : <GridView />}</Box>
    </Box>
  );
};

export default ProductCatalogue;

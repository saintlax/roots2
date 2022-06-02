import {
  Box,
  Divider,
  Flex,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import Doghnut from './Doghnut';
import { useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency } from '../../../../constants/constants';
const { REACT_APP_API_URL } = process.env;

const ProductAnalytics = ({ summary }) => {
  const products = useSelector((state) => state.products.topSelling);
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();
  const userBranch = useSelector((state) => state.userBranch);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    //&branchId=${this.branch.id
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `${userBranch.merchantId}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      query = `${merchant.id}`;
    }
    await Axios.get(
      `${REACT_APP_API_URL}/products/topSellingMerchantProducts/${query}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_TOPSELLING_PRODUCTS, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex
      direction={['column', '', '', 'row']}
      bg={['white']}
      w='100%'
      justify={'space-between'}
      p='8'
      borderRadius={'10'}
      gap='2'
    >
      {summary?.amountGenerated > 0 || summary?.amountPending > 0 ? (
        <Flex flex={['0.9']} direction={['column', 'row']} pr='3'>
          <Stack>
            <Text as='h3'>Product Sales Analytics</Text>
            <Box
              w={['100%', '300px', '']}
              h={['100%', '', '220px']}
              mx={['auto']}
            >
              <Doghnut summary={summary} />
            </Box>
          </Stack>
          <UnorderedList
            w='100%'
            styleType='disc'
            display='flex'
            flexDirection={['row', 'column']}
            justifyContent={['space-between', 'center']}
            alignItems={['center', '', 'start']}
            flexWrap='wrap'
          >
            <ListItem>
              <Text as='span' pos='relative' left='-10px' top='-4px'>
                N
                {summary?.amountGenerated
                  ? formatCurrency(summary?.amountGenerated)
                  : '0.00'}
              </Text>
            </ListItem>
            <ListItem>
              <Text as='span' pos='relative' left='-10px' top='-4px'>
                N
                {summary?.amountPending
                  ? formatCurrency(summary?.amountPending)
                  : '0.00'}
              </Text>
            </ListItem>
            <ListItem>
              <Text as='span' pos='relative' left='-10px' top='-4px'>
                N
                {summary?.amountCancelled
                  ? formatCurrency(summary?.amountCancelled)
                  : '0.00'}
              </Text>
            </ListItem>
          </UnorderedList>
        </Flex>
      ) : (
        <></>
      )}

      <Divider orientation='vertical' />
      {products && products.length > 0 ? (
        <Stack flex='0.9' textAlign={'center'}>
          <Text as='h3' mb='5px'>
            Top Selling Products
          </Text>
          {products.slice(0, 7).map((product, index) => (
            <HStack key={index} justify={'space-evenly'}>
              <Text>{product.name}</Text>
              <Text color='green'>
                N{product.price ? formatCurrency(product.price) : '0.00'}
              </Text>
            </HStack>
          ))}
          {/* <Text as='h4'>View Products</Text> */}
        </Stack>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default ProductAnalytics;

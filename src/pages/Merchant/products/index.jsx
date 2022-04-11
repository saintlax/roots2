import { Box, Button, Stack, Text, HStack } from '@chakra-ui/react';
import { ProductSummary } from './components/ProductSummary';
import IsMobile from '../../../components/common/IsMobile';
import ProductSalesAnalytics from './components/ProductSalesAnalytics';
import ProductCatalogue from './components/ProductCatalogue';
import './product.css';
import { AddProductModal } from './components/AddProductModal';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
const { REACT_APP_API_URL } = process.env;
export const Products = () => {
  const isMobile = IsMobile();
  const userBranch = useSelector((state) => state.userBranch);
  const [userMerchant, setUserMerchant] = useState({});
  useEffect(() => {
    getUserMerchant();
  }, []);

  const getUserMerchant = async () => {
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `${userBranch.merchantId}`;
    } else {
      return;
    }
    await Axios.get(`${REACT_APP_API_URL}/merchant/filter/filter?id=${query}`)
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          if (payload && payload.length > 0) {
            const merchant = payload[0];

            setUserMerchant(merchant);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Stack w='100%' h='100%'>
      <HStack justify='space-between' py='5'>
        <Text as='h2'>Products Summary</Text>

        {isMobile ? (
          <Button size='sm' bg='primary'>
            <AddProductModal isMobile={isMobile} userMerchant={userMerchant} />
          </Button>
        ) : (
          <Button size='sm' bg={'#1459DF'} color='#fff'>
            <AddProductModal isMobile={isMobile} userMerchant={userMerchant} />
          </Button>
        )}
      </HStack>
      <Stack className='products-page-grid'>
        <Box className='top-selling-products'>
          <ProductSummary />
        </Box>
        <Box className='product-sales-analytics'>
          <ProductSalesAnalytics />
        </Box>
        <Box className='product-catalogue'>
          <ProductCatalogue isMobile={isMobile} />
        </Box>
      </Stack>
    </Stack>
  );
};

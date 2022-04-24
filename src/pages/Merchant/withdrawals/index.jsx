import { Box, Button, Stack, Text, HStack } from '@chakra-ui/react';
import IsMobile from '../../../components/common/IsMobile';
// import './product.css';

export const Withdrawals = () => {
  const isMobile = IsMobile();
  return (
    <Stack w='100%' h='100%'>
      <HStack justify='space-between' py='5'>
        <Text as='h2'>Coming soon</Text>

        {isMobile ? (
          <Button size='sm' bg='primary'>
            {/* <AddProductModal isMobile={isMobile} userMerchant={userMerchant} /> */}
          </Button>
        ) : (
          <Button size='sm' bg={'#1459DF'} color='#fff'>
            {/* <AddProductModal isMobile={isMobile} userMerchant={userMerchant} /> */}
          </Button>
        )}
      </HStack>
      <Stack className='products-page-grid'>
        <Box className='top-selling-products'>{/* <ProductSummary /> */}</Box>
        <Box className='product-sales-analytics'>
          {/* <ProductSalesAnalytics /> */}
        </Box>
        <Box className='product-catalogue'>
          {/* <ProductCatalogue isMobile={isMobile} /> */}
        </Box>
      </Stack>
    </Stack>
  );
};

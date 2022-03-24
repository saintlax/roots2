import { Box, Button, Stack, Text, HStack } from '@chakra-ui/react';
import { ProductSummary } from './components/ProductSummary';
import IsMobile from '../../../components/common/IsMobile';
import { AiOutlinePlus } from 'react-icons/ai';
import ProductSalesAnalytics from './components/ProductSalesAnalytics';
import ProductCatalogue from './components/ProductCatalogue';
import './product.css';
import { AddProductModal } from './components/AddProductModal';

export const Products = () => {
  const isMobile = IsMobile();
  return (
    <Stack w='100%' h='100%'>
      <HStack justify='space-between' py='5'>
        <Text as='h2'>Products Summary</Text>

        {isMobile ? (
          <Button size='sm' bg='primary'>
            <AddProductModal isMobile={isMobile} />
          </Button>
        ) : (
          <Button size='sm' bg={'#1459DF'} color='#fff'>
            <AddProductModal isMobile={isMobile} />
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
          <ProductCatalogue />
        </Box>
      </Stack>
    </Stack>
  );
};

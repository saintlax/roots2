import {
  Box,
  Button,
  Flex,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ProductSummary } from './components/ProductSummary';
import { Dropdown } from './components/Dropdown';
import { OrdersTable } from './components/OrdersTable';
import { GridView } from './components/GridView';
import { MdOutlineDashboard } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import IsMobile from '../../../components/common/IsMobile';
import { AiOutlinePlus } from 'react-icons/ai';
import ProductAnalytics from '../dashboard/components/ProductAnalytics';
import ProductSalesAnalytics from './components/ProductSalesAnalytics';
import ProductCatalogue from './components/ProductCatalogue';
import './product.css';

export const Products = () => {
  // const [views, setViews] = useState(true);
  // const view = views ? 'List View' : 'Grid View';
  const isMobile = IsMobile();
  return (
    <Stack w='100%' h='100%'>
      <HStack justify='space-between' py='5'>
        <Text as='h2'>Products Summary</Text>

        {isMobile ? (
          <Button size='sm' bg='primary'>
            <AiOutlinePlus color='#fff' />
          </Button>
        ) : (
          <Button size='sm' bg={'#1459DF'} color='#fff'>
            Create New
          </Button>
        )}
      </HStack>
      <Stack className='products-page-grid'>
        <Box className='top-selling-products'>
          <ProductSummary />
        </Box>
        <Box bg='#fff' p='5' className='product-sales-analytics'>
          <ProductSalesAnalytics />
        </Box>
        <Box className='product-catalogue'>
          <ProductCatalogue />
        </Box>
      </Stack>
    </Stack>
  );
};

// export default Orders;

import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { AddCategoryModal } from './components/AddCategory';
import { CategoriesTable } from './components/CategoriesTable';

const ProductCategories = () => {
  return (
    <Box>
      <Flex my='20px' justifyContent={['space-between']}>
        <Box>
          <Text color={'#4A4C4F'} fontSize={['20px']} fontWeight={['bold']}>
            Product categories
          </Text>
        </Box>
        <Box>
          <AddCategoryModal />
        </Box>
      </Flex>
      <Box>
        <CategoriesTable />
      </Box>
    </Box>
  );
};

export default ProductCategories;

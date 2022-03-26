import { Box, Button, Flex, Text, HStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';
import { OrdersTable } from './OrdersTable';
import { GridView } from './GridView';
import { Dropdown } from './Dropdown';
import { AddCategoryModal } from './AddCategoryModal';
const ProductCatalogue = ({ isMobile }) => {
  const [views, setViews] = useState(true);
  const view = views ? 'List View' : 'Grid View';

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
          <Dropdown />

          {isMobile ? (
            <Button size='sm' bg='primary'>
              <AddCategoryModal isMobile={isMobile} />
            </Button>
          ) : (
            <Button size='sm' bg={'#1459DF'} color='#fff'>
              <AddCategoryModal isMobile={isMobile} />
            </Button>
          )}
        </Flex>
      </Flex>
      <Box>{views ? <OrdersTable /> : <GridView />}</Box>
    </Box>
  );
};

export default ProductCatalogue;

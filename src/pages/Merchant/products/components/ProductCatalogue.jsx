import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';
import { OrdersTable } from './OrdersTable';
import { GridView } from './GridView';
import { Dropdown } from './Dropdown';

const ProductCatalogue = () => {
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
        </Flex>
      </Flex>
      <Box>{views ? <OrdersTable /> : <GridView />}</Box>
    </Box>
  );
};

export default ProductCatalogue;

import {
  Box,
  ListItem,
  Flex,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import Doghnut from '../../dashboard/components/Doghnut';
import { useSelector } from 'react-redux';

const ProductSalesAnalytics = () => {
  const summary = useSelector((state) => state.merchantSummary);

  return (
    <Stack borderRadius={'10px'} p='5' border='1px solid #eee' h='100%'>
      <Text as='h3'>Product Sales Analytics</Text>
      <Flex className='doughnut-stat-wrapper' direction={['column', 'row']}>
        <Box
          w={['100%', '300px', '100%']}
          h={['100%', '', '220px', '228px']}
          mx={['auto']}
        >
          <Doghnut />
        </Box>

        <UnorderedList
          w='100%'
          styleType='disc'
          display='flex'
          flexDirection={['row', 'column', '', 'row']}
          justifyContent={['space-evenly', 'center', '', 'space-evenly']}
          alignItems={['center', '', 'start']}
          flexWrap='wrap'
        >
          <ListItem>
            <Text as='span' pos='relative' left='-10px' top='-4px'>
              N{summary?.amountGenerated}
            </Text>
          </ListItem>
          <ListItem>
            <Text as='span' pos='relative' left='-10px' top='-4px'>
              N{summary?.amountPending}
            </Text>
          </ListItem>
          <ListItem>
            <Text as='span' pos='relative' left='-10px' top='-4px'>
              N{summary?.amountCancelled}
            </Text>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Stack>
  );
};

export default ProductSalesAnalytics;

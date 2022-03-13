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

const ProductSalesAnalytics = () => {
  return (
    <Stack>
      <Text as='h3'>Product Sales Analytics</Text>
      <Flex className='doughnut-stat-wrapper' direction={['column', 'row']}>
        <Box
          w={['100%', '300px', '100%']}
          h={['100%', '', '220px', '230px']}
          mx={['auto']}
        >
          <Doghnut />
        </Box>

        <UnorderedList
          w='100%'
          styleType='disc'
          display='flex'
          flexDirection={['row', 'column', '', 'row']}
          justifyContent={['space-between', 'center', '', 'space-evenly']}
          alignItems={['center', '', 'start']}
          flexWrap='wrap'
        >
          <ListItem>
            <Text as='span' pos='relative' left='-10px' top='-4px'>
              N4000
            </Text>
          </ListItem>
          <ListItem>
            <Text as='span' pos='relative' left='-10px' top='-4px'>
              N4,000
            </Text>
          </ListItem>
          <ListItem>
            <Text as='span' pos='relative' left='-10px' top='-4px'>
              N3,200
            </Text>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Stack>
  );
};

export default ProductSalesAnalytics;

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

const ProductAnalytics = () => {
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
      <Flex flex={['0.9']} direction={['column', 'row']} pr='3'>
        <Stack>
          <Text as='h3'>Product Sales Analytics</Text>
          <Box
            w={['100%', '300px', '']}
            h={['100%', '', '220px']}
            mx={['auto']}
          >
            <Doghnut />
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
      <Divider orientation='vertical' />
      <Stack flex='0.9' textAlign={'center'}>
        <Text as='h3' mb='5px'>
          Top Selling Products
        </Text>
        {[...Array(7)].map((_, index) => (
          <HStack key={index} justify={'space-evenly'}>
            <Text>Nike Shoe</Text>
            <Text color='green'>N250,000</Text>
          </HStack>
        ))}
        <Text as='h4'>View Products</Text>
      </Stack>
    </Flex>
  );
};

export default ProductAnalytics;

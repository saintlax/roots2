import { Box, Flex, Image, Progress, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';

export const Catalogue = () => {
  return (
    <Box border={'none'} bg='#fff' p='20px' borderRadius='10px'>
      <Flex justifyContent={'flex-end'}>
        <BsThreeDots size={'16px'} cursor='pointer' />
      </Flex>
      <Box height={'200px'}>
        <Image src='' alt='' />
      </Box>

      <Box>
        <Flex justifyContent={'space-between'}>
          <Text fontSize={['18px']} color={'#0068DD'}>
            Pizza
          </Text>
          <Text>#20,000</Text>
        </Flex>
        <Box my='10px'>
          <Text mb='2px'>This is a short description of this item.</Text>
          <Text color={'#4A4C4F80'}>
            Available in Lagos, Ikeja and 2 other branch
          </Text>
        </Box>

        <Box
          p='10px'
          border={'1px solid grey'}
          width='70px'
          borderRadius={'5px'}
          textAlign='center'
        >
          <Text>Food</Text>
        </Box>
      </Box>
      <Box mt='20px'>
        <Text>502 item left</Text>
        <Progress value={80} />
      </Box>
    </Box>
  );
};

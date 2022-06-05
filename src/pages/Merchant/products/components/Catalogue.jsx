import { Box, Flex, Image, Progress, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { formatCurrency } from '../../../../constants/constants';
export const Catalogue = ({ product }) => {
  return (
    <Box border={'none'} bg='#fff' p='20px' borderRadius='10px'>
      <Flex justifyContent={'flex-end'}>
        <BsThreeDots size={'16px'} cursor='pointer' />
      </Flex>
      <Box height={'200px'} w='100px'>
        <Image
          w='100%'
          height='100%'
          src={product?.profileImage}
          alt={product?.name}
        />
      </Box>

      <Box>
        <Flex justifyContent={'space-between'}>
          <Text fontSize={['18px']} color={'#0068DD'}>
            {product?.name}
          </Text>
          <Text># {formatCurrency(product?.price)}</Text>
        </Flex>
        <Box my='10px'>
          <Text mb='2px'>{product?.description}</Text>
          <Text color={'#4A4C4F80'}>
            Available in {product?.branch?.address}
          </Text>
        </Box>

        <Box
          p='10px'
          border={'1px solid grey'}
          width='60%'
          borderRadius={'5px'}
          textAlign='center'
        >
          <Text>{product?.category}</Text>
        </Box>
      </Box>
      <Box mt='20px'>
        <Text>{product?.qty} left</Text>
        <Progress value={80} />
      </Box>
    </Box>
  );
};

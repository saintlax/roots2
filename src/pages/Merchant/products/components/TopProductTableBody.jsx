import { Tr, Tbody, Td, Flex, Text, Tooltip, Circle } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';
import { MdHeadset } from 'react-icons/md';
import { useSelector } from 'react-redux';

export const TopProductTableBody = () => {
  const products = useSelector((state) => state.products.topSelling);

  return (
    <Tbody>
      {products.slice(0, 5).map((data, i) => {
        return (
          <Tr key={i}>
            <Td fontSize={['12px']} py='20px !important'>
              {i + 1}
            </Td>
            <Tooltip label={data?.prodName}>
              <Td fontSize={['12px']} py='20px !important'>
                <Flex alignItems={'center'}>
                  <Circle bg={'#fbf5ef'} size='30px' mr='10px'>
                    <MdHeadset size={'16px'} />
                  </Circle>
                  <Text isTruncated>{data?.name}</Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={data?.amount}>
              <Td fontSize={['12px']} py='20px !important'>
                <Text isTruncated>{data?.amount}</Text>
              </Td>
            </Tooltip>
            <Tooltip label={data?.totalOrders}>
              <Td isTruncated fontSize={['12px']} py='20px !important'>
                {data?.totalOrders}
              </Td>
            </Tooltip>
            <Td fontSize={['12px']} py='20px !important'>
              {data?.amount}
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

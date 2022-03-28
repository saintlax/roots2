import { Tr, Tbody, Td, Flex, Text, Tooltip, Circle } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';
import { MdHeadset } from 'react-icons/md';
import { MenuLItems } from './MenuList';
import { useSelector } from 'react-redux';

export const TableBody = () => {
  const products = useSelector((state) => state.products.products);
  return (
    <Tbody>
      {products.map((data, i) => {
        return (
          <Tr key={i}>
            <Tooltip label={data?.name}>
              <Td
                isTruncated
                px={['20px !important', '40px !important']}
                fontSize={['14px']}
              >
                <Flex alignItems={'center'}>
                  <Circle bg={'#fbf5ef'} size='30px' mr='10px'>
                    <MdHeadset size={'16px'} />
                  </Circle>
                  <Text isTruncated>{data?.name}</Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={data?.description}>
              <Td
                isTruncated
                maxWidth={'150px'}
                px={['20px !important', '40px !important']}
                fontSize={['14px']}
              >
                <Flex alignItems={'center'}>
                  <Text>{data?.description}</Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={data?.category}>
              <Td
                px={['20px !important', '40px !important']}
                fontSize={['14px']}
              >
                {data?.category}
              </Td>
            </Tooltip>
            <Tooltip label={data?.branch?.name}>
              <Td
                isTruncated
                maxWidth={'150px'}
                px={['20px !important', '40px !important']}
                fontSize={['14px']}
              >
                {data?.branch?.name}
              </Td>
            </Tooltip>
            <Td px={['20px !important', '40px !important']} fontSize={['14px']}>
              {data?.qty}
            </Td>
            <Td px={['20px !important', '40px !important']} fontSize={['14px']}>
              {data?.price}
            </Td>

            <Td px={['20px !important', '40px !important']} fontSize={['14px']}>
              <MenuLItems
                name={data?.name}
                dateCreated={data?.CreatedOn}
                product={data}
              />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

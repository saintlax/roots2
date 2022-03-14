import { Tr, Tbody, Td, Flex, Text } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';

import { MenuLItems } from './MenuList';

export const TableBody = () => {
  return (
    <Tbody>
      {tableBodyData.map((data, i) => {
        return (
          <Tr key={i}>
            <Td isTruncated maxWidth={'120px'}>
              {data?.address}
            </Td>
            <Td isTruncated maxWidth={'120px'}>
              <Flex alignItems={'center'}>
                <Text>{data?.address}</Text>
              </Flex>
            </Td>
            <Td>{data?.name}</Td>
            <Td>{data?.amount}</Td>
            <Td>{data?.totalOrders}</Td>

            <Td maxWidth='100px'>
              <MenuLItems name={data?.name} dateCreated={data?.dateCreated} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

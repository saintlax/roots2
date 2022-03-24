import { Tr, Tbody, Td, Flex, Text } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';

import { MenuLItems } from './MenuList';
import { useSelector, useDispatch } from 'react-redux';
import { AddStaffModal } from './AddStaffModal';

export const TableBody = () => {
  const branches = useSelector((state) => state.branches);

  return (
    <Tbody>
      {branches.map((data, i) => {
        return (
          <Tr key={i}>
            <Td isTruncated maxWidth={'120px'}>
              {data?.name}
            </Td>
            <Td isTruncated maxWidth={'120px'}>
              <Flex alignItems={'center'}>
                <Text>{data?.address}</Text>
              </Flex>
            </Td>
            <Td>
              <AddStaffModal branch={data} />
            </Td>
            <Td>{data?.amount}</Td>
            <Td>{data?.totalOrders}</Td>

            <Td maxWidth='100px'>
              <MenuLItems
                name={data?.name}
                dateCreated={data?.dateCreated}
                branch={data}
              />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

import { Tr, Tbody, Td, Flex, Text } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';
import { MenuLItems } from './MenuList';

export const TableBody = () => {
  return (
    <Tbody>
      {tableBodyData.map((data, i) => {
        return (
          <Tr key={i}>
            <Td fontSize={['13px']}>
              {data?.orderId}
              {/* <Checkbox size="lg" colorScheme="orange" defaultChecked /> */}
            </Td>
            <Td fontSize={['13px']}>
              <Flex alignItems={'center'}>
                {/* <Avatar size={"sm"} name={data?.name} src={""} mr="5px" /> */}
                <Text>{data?.date}</Text>
              </Flex>
            </Td>
            <Td fontSize={['13px']}>{data?.name}</Td>
            <Td fontSize={['13px']}>{data?.address}</Td>
            <Td fontSize={['13px']}>{data?.phone}</Td>
            <Td fontSize={['13px']}>{data?.amount}</Td>
            <Td fontSize={['13px']}>
              <Text
                color={
                  data?.status === 'Completed'
                    ? '#009A49'
                    : data?.status === 'Rejected'
                    ? 'red'
                    : '#FFC529'
                }
                bg={data?.status === 'Completed' ? '#F3FCF7' : '#f4f4f4'}
                borderRadius={'5px'}
                p='5px 8px'
              >
                {data?.status}
              </Text>
            </Td>
            <Td fontSize={['13px']}>
              <MenuLItems name={data?.name} dateCreated={data?.dateCreated} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

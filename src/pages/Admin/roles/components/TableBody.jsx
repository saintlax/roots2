import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';
import { MenuLItems } from './MenuList';

export const TableBody = () => {
  return (
    <Tbody>
      {tableBodyData.map((data, i) => {
        return (
          <Tr key={i}>
            <Td>
              <Checkbox size='lg' colorScheme='orange' defaultChecked />
            </Td>
            <Td>
              <Flex alignItems={'center'}>
                <Avatar
                  size={'sm'}
                  name={data?.name}
                  src={data?.imageUrl}
                  mr='5px'
                />
                <Text>{data?.name}</Text>
              </Flex>
            </Td>
            <Td>{data?.email}</Td>
            <Td>{data?.phone}</Td>
            <Td>{data?.dateCreated}</Td>
            <Td>
              <Text
                color={'#009A49'}
                bg='#F3FCF7'
                borderRadius={'5px'}
                p='5px 8px'
              >
                {data?.status}
              </Text>
            </Td>
            <Td>
              <MenuLItems name={data?.name} data={data} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

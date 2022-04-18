import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
// import { tableBodyData } from './tableBodyData';
import { MenuLItems } from './MenuList';
import { useSelector, useDispatch } from 'react-redux';
export const TableBody = () => {
  const adminSummary = useSelector((state) => state.adminSummary);
  console.log('====================================');
  console.log(adminSummary?.allMerchants);
  console.log('====================================');
  const tableBodyData = adminSummary?.allMerchants;
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
                <Avatar size={'sm'} name={data?.name} src={''} mr='5px' />
                <Text>{data?.businessName}</Text>
              </Flex>
            </Td>
            <Td>{data?.email}</Td>
            <Td>{data?.companyPhoneNumber}</Td>
            <Td>{data?.branches?.length}</Td>
            <Td>
              <Text
                color={data?.isActive ? '#FFFFFF' : '#009A49'}
                bg='#F3FCF7'
                borderRadius={'5px'}
                p='5px 8px'
              >
                {data?.isActive ? 'ACTIVE' : 'INACTIVE'}
              </Text>
            </Td>
            <Td>
              <MenuLItems merchant={data} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

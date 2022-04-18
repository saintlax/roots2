import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
// import { tableBodyData } from './tableBodyData';

// import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';

import { MenuLItems } from './MenuList';

export const TableBody = () => {
  const adminSummary = useSelector((state) => state.adminSummary);
  const tableBodyData = adminSummary.allUsers || [];
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
                  name={
                    data?.firstName +
                    ' ' +
                    data?.lastName +
                    ' ' +
                    data?.middleName
                  }
                  src={data?.imageUrl}
                  mr='5px'
                />
                <Text>{data?.firstName + ' ' + data?.lastName}</Text>
              </Flex>
            </Td>
            <Td>{data?.email}</Td>
            <Td>{data?.phoneNumber}</Td>
            <Td>{data?.loanAmount}</Td>
            <Td>
              <Text
                color={'#009A49'}
                bg='#F3FCF7'
                borderRadius={'5px'}
                p='5px 8px'
              >
                {data?.type}
              </Text>
            </Td>
            <Td
            // position={["sticky", "unset"]} right={["-3%", 0]} marginTop={["-30px", 0]}
            >
              <MenuLItems data={data} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

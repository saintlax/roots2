import { Tr, Tbody, Td, Flex, Text, HStack } from '@chakra-ui/react';

// import { MenuLItems } from './MenuList';
// import { useSelector, useDispatch } from 'react-redux';
import { DeleteStaffAlert } from './DeleteStaffAlert';
export const BranchStaffTableBody = ({ branch }) => {
  //useSelector((state) => state.branches);

  return (
    <Tbody>
      {branch.users.map((data, i) => {
        return (
          <Tr key={i}>
            <Td isTruncated maxWidth={'120px'}>
              {data?.firstName} {data?.lastName}
            </Td>
            <Td isTruncated maxWidth={'120px'}>
              <Flex alignItems={'center'}>
                <Text>{data?.email}</Text>
              </Flex>
            </Td>

            <Td>
              <DeleteStaffAlert staff={data} />
            </Td>

            {/* <Td maxWidth='100px'>
              <MenuLItems
                name={data?.name}
                dateCreated={data?.dateCreated}
                branch={data}
              />
            </Td> */}
          </Tr>
        );
      })}
    </Tbody>
  );
};

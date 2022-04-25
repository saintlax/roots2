import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
// import { tableBodyData } from './tableBodyData';
import { MenuLItems } from './MenuList';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import { useEffect } from 'react';
import Axios from 'axios';
const { REACT_APP_API_URL } = process.env;
export const TableBody = () => {
  const dispatch = useDispatch();
  const tableBodyData = useSelector((state) => state.allMerchants.merchants);

  useEffect(() => {
    getAllMerchants();
  }, []);
  const getAllMerchants = async () => {
    await Axios.get(`${REACT_APP_API_URL}/merchant`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const { payload } = response.data;
          dispatch({ type: ActionTypes.REFRESH_ALL_MERCHANT, payload });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const tableBodyData = adminSummary?.allMerchants;
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
                color={data?.isActive ? '#009A49' : '#FFC529'}
                bg={data?.isActive ? '#F3FCF7' : '#f4f4f4'}
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

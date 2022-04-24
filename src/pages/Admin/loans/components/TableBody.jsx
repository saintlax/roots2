import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';
import { MenuLItems } from './MenuList';

import { useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency, formatDate } from '../../../../constants/constants';
const { REACT_APP_API_URL } = process.env;

export const TableBody = () => {
  const dispatch = useDispatch();
  const loans = useSelector((state) => state.adminLoans.loans);
  useEffect(() => {
    getAllLoans();
  }, []);
  const getAllLoans = async () => {
    await Axios.get(`${REACT_APP_API_URL}/loans`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_ADMIN_LOANS, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Tbody>
      {loans.map((data, i) => {
        return (
          <Tr key={i}>
            <Td>
              <Checkbox size='lg' colorScheme='orange' defaultChecked />
            </Td>
            <Td>
              <Flex alignItems={'center'}>
                <Avatar
                  size={'sm'}
                  name={data?.user?.firstName + ' ' + data?.user?.lastName}
                  src={data?.imageUrl}
                  mr='5px'
                />
                <Text>
                  {data?.user?.firstName + ' ' + data?.user?.lastName}
                </Text>
              </Flex>
            </Td>
            <Td>{data?.user?.phoneNumber}</Td>
            <Td>{formatCurrency(data?.amount)}</Td>
            <Td>{formatCurrency(data?.paybackAmount)}</Td>
            <Td>{formatDate(data?.paybackDate)}</Td>
            <Td>
              <Text
                color={
                  data?.status === 'COMPLETED'
                    ? '#009A49'
                    : data?.status === 'DECLINED'
                    ? '#FF1A1A'
                    : 'yellow'
                }
                bg={
                  data?.status === 'COMPLETED'
                    ? '#F3FCF7'
                    : data?.status === 'DECLINED'
                    ? '#FFF4F4'
                    : '#fffcf4'
                }
                borderRadius={'5px'}
                p='5px 8px'
              >
                {data?.status}
              </Text>
            </Td>
            <Td>
              <MenuLItems
                name={data?.user?.firstName + ' ' + data?.user?.lastName}
                data={data}
              />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

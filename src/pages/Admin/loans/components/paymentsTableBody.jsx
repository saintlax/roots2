import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';
import { MenuLItems } from './MenuList';

import { useEffect, useState } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency, formatDate } from '../../../../constants/constants';
const { REACT_APP_API_URL } = process.env;

export const PaymentsTableBody = ({ loan }) => {
  const dispatch = useDispatch();
  // const loans = useSelector((state) => state.adminLoans.loans);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    getPayments();
  }, [loan]);
  const getPayments = async () => {
    await Axios.get(
      `${REACT_APP_API_URL}/payments/filter/filter?loanId=${loan.id}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          setPayments(payload);
          // dispatch({ type: ActionTypes.REFRESH_ADMIN_LOANS, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Tbody>
      {payments.map((data, i) => {
        return (
          <Tr key={i}>
            <Td>
              <Checkbox size='lg' colorScheme='orange' defaultChecked />
            </Td>
            <Td>
              <Flex alignItems={'center'}>
                <Text>{formatCurrency(data?.amount)}</Text>
              </Flex>
            </Td>
            <Td>{formatDate(data?.createdOn)}</Td>
            <Td>
              <Text
                color={
                  data?.status === 'PAID'
                    ? '#009A49'
                    : data?.status === 'DECLINED'
                    ? '#FF1A1A'
                    : 'yellow'
                }
                bg={
                  data?.status === 'PAID'
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
          </Tr>
        );
      })}
    </Tbody>
  );
};

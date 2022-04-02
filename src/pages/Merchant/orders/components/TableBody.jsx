import { Tr, Tbody, Td, Flex, Text } from '@chakra-ui/react';
//import { tableBodyData } from './tableBodyData';
import { MenuLItems } from './MenuList';
import { useState, useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;

export const TableBody = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const merchant = useSelector((state) => state.merchant);

  useEffect(() => {
    console.log('LOADING ORDERS......', merchant);
    getOrders();
  }, []);
  const getOrders = async () => {
    //&branchId=${this.branch.id
    await Axios.get(
      `${REACT_APP_API_URL}/loanproducts/filter/filter?merchantId=${merchant.id}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_ORDERS, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Tbody>
      {orders.map((data, i) => {
        return (
          <Tr key={i}>
            <Td fontSize={['13px']}>
              {data?.orderId}
              {/* <Checkbox size="lg" colorScheme="orange" defaultChecked /> */}
            </Td>
            <Td fontSize={['13px']}>
              <Flex alignItems={'center'}>
                {/* <Avatar size={"sm"} name={data?.name} src={""} mr="5px" /> */}
                <Text>{data?.createdOn}</Text>
              </Flex>
            </Td>
            <Td fontSize={['13px']}>
              {data?.user?.firstName} {data?.user?.lasstName}
            </Td>
            <Td fontSize={['13px']}>{data?.user?.phoneNumber}</Td>
            <Td fontSize={['13px']}>{data?.product?.price}</Td>
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
              <MenuLItems order={data} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

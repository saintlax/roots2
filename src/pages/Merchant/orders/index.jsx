import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Dropdown } from './components/Dropdown';
import { OrdersTable } from './components/OrdersTable';
import { ActionTypes } from '../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;

export const Orders = () => {
  const userBranch = useSelector((state) => state.userBranch);
  const user = useSelector((state) => state.user);
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();

  const onFilter = (data) => {
    let d = new Date();
    switch (data) {
      case 'Last 7 days':
        d.setDate(d.getDate() - 7);
        console.log(d);
        break;
      case 'Today':
        console.log(d);
        break;
      case 'Yesterday':
        d.setDate(d.getDate() - 1);
        break;
      case 'Last month':
        d = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate());
        console.log(d);
        break;

      case 'Last 6 months':
        d = new Date(d.getFullYear(), d.getMonth() - 6, d.getDate());
        console.log(d);
        break;
      case 'Last Year':
        d = new Date(d.getFullYear(), d.getMonth() - 12, d.getDate());
        console.log(d);
        break;
      case 'Last 2 Years':
        d = new Date(d.getFullYear(), d.getMonth() - 24, d.getDate());
        console.log(d);
        break;
      case 'Last 5 Years':
        d = new Date(d.getFullYear(), d.getMonth() - 12 * 5, d.getDate());
        console.log(d);
        break;
    }
    postFilter(d, new Date());
  };
  const postFilter = async (startDate, endDate) => {
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `merchantId=${userBranch.merchantId}&userId=${user.id}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      query = `merchantId=${merchant.id}&userId=${user.id}`;
    }
    query += `&startDate=${startDate}&endDate=${endDate}`;
    await Axios.get(
      `${REACT_APP_API_URL}/loanproducts/filterReportByDate/filter?${query}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          console.log('filter response data......', payload);
          dispatch({ type: ActionTypes.REFRESH_ORDERS, payload });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box width={'100%'}>
      <Flex my='20px' justifyContent={['space-between']}>
        <Box>
          <Text color={'#4A4C4F'} fontSize={['20px']} fontWeight={['bold']}>
            Order list
          </Text>
        </Box>
        <Box>
          <Dropdown onFilter={onFilter} />
        </Box>
      </Flex>
      <Box width={'100%'}>
        <OrdersTable />
      </Box>
    </Box>
  );
};

// export default Orders;

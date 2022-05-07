import { Tr, Tbody, Td, Flex, Text, HStack } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';

import { MenuLItems } from './MenuList';
import { useSelector, useDispatch } from 'react-redux';
import { AddStaffModal } from './AddStaffModal';
import { ViewStaffModal } from './ViewStaffModal';

import { useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { formatCurrency } from '../../../../constants/constants';
const { REACT_APP_API_URL } = process.env;
export const TableBody = () => {
  const branches = useSelector((state) => state.branches);
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();

  useEffect(() => {
    getBranches();
    getRoles();
  }, []);
  const getBranches = async () => {
    await Axios.get(
      `${REACT_APP_API_URL}/branches/filter/filter?merchantId=${merchant.id}`
    )
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_BRANCH, payload });
          getOrders();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRoles = async () => {
    //&branchId=${this.branch.id
    await Axios.get(
      `${REACT_APP_API_URL}/roles/filter/filter?merchantId=${merchant.id}`
    )
      .then((response) => {
        console.log('====> roles <====', response.data.payload);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_ROLE, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getOrders = async () => {
    //&branchId=${this.branch.id
    await Axios.get(
      `${REACT_APP_API_URL}/loanproducts/filter/filter?merchantId=${merchant.id}&status=Approved`
    )
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          sortOrders(payload);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortOrders = (orders) => {
    branches.forEach((branch) => {
      const branchFilter = orders.filter(
        (order) => branch.id === order.branchId
      );
      branch.amount = 0;
      branch.totalOrders = 0;
      branch.orders = [];
      if (branchFilter && branchFilter.length > 0) {
        branch.amount = getTotalRevenue(branchFilter);
        branch.totalOrders = branchFilter.length;
        branch.orders = branchFilter;
      }

      dispatch({ type: ActionTypes.EDIT_BRANCH, payload: branch });
    });
  };

  const getTotalRevenue = (branchOrderFilter) => {
    let sum = 0;
    branchOrderFilter.forEach((order) => {
      sum += order?.product?.price;
    });
    return sum;
  };

  return (
    <Tbody>
      {branches.map((data, i) => {
        return (
          <Tr key={i}>
            <Td isTruncated maxWidth={'120px'}>
              {data?.name}
            </Td>
            <Td isTruncated maxWidth={'120px'}>
              <Flex alignItems={'center'}>
                <Text>{data?.address}</Text>
              </Flex>
            </Td>
            <Td>
              <HStack justify={['space-between']}>
                <AddStaffModal branch={data} />
                <ViewStaffModal branch={data} />
              </HStack>
            </Td>
            <Td>
              {data?.amount ? formatCurrency(data?.amount) : formatCurrency(0)}
            </Td>
            <Td>{data?.totalOrders}</Td>

            <Td maxWidth='100px'>
              <MenuLItems
                name={data?.name}
                dateCreated={data?.dateCreated}
                branch={data}
              />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

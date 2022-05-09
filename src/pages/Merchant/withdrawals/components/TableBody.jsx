import { Tr, Tbody, Td, Flex, Text, Tooltip, Circle } from '@chakra-ui/react';
// import { tableBodyData } from './tableBodyData';
import { MdHeadset } from 'react-icons/md';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { formatCurrency, formatDate } from '../../../../constants/constants';
const { REACT_APP_API_URL } = process.env;

export const TableBody = () => {
  const withdrawals = useSelector((state) => state.withdrawals.withdrawals);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    getWithdrawals();
  }, []);
  const getWithdrawals = async () => {
    let query = `/withdrawals/filter/filter?userId=${user.id}`;

    await Axios.get(`${REACT_APP_API_URL}${query}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_WITHDRAWAL, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Tbody>
      {withdrawals.map((data, i) => {
        return (
          <Tr key={i}>
            <Td fontSize={['12px']} py='20px !important'>
              {i + 1}
            </Td>
            <Tooltip label={data?.amount}>
              <Td fontSize={['12px']} py='20px !important'>
                <Flex alignItems={'center'}>
                  <Text isTruncated>
                    {data?.amount ? formatCurrency(data?.amount) : '0.00'}
                  </Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={data?.description}>
              <Td fontSize={['12px']} py='20px !important'>
                <Flex alignItems={'center'}>
                  <Text isTruncated>{data?.description}</Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={data?.status}>
              <Td fontSize={['12px']} py='20px !important'>
                <Flex alignItems={'center'}>
                  <Text isTruncated>{data?.status}</Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={formatDate(data?.createdOn)}>
              <Td fontSize={['12px']} py='20px !important'>
                <Text isTruncated>{formatDate(data?.createdOn)}</Text>
              </Td>
            </Tooltip>
          </Tr>
        );
      })}
    </Tbody>
  );
};

import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
import { MenuLItems } from './MenuList';
import { useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
export const TableBody = () => {
  const banks = useSelector((state) => state.banks.banks);
  const dispatch = useDispatch();

  useEffect(() => {
    getBanks();
  }, []);

  const getBanks = async () => {
    await Axios.get(`${REACT_APP_API_URL}/banks`)
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_BANK, payload });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Tbody>
      {banks.map((data, i) => {
        return (
          <Tr key={i}>
            <Td>
              <Flex alignItems={'center'}>
                <Avatar
                  size={'sm'}
                  name={data?.name}
                  src={data?.logo}
                  mr='5px'
                />
                <Text>{data?.name}</Text>
              </Flex>
            </Td>
            <Td>{data?.code}</Td>

            <Td>
              <MenuLItems name={data?.name} data={data} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

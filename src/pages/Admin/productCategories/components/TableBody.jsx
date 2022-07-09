import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
import { MenuLItems } from './MenuList';
import { useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
export const TableBody = () => {
  const categories = useSelector((state) => state.adminProductCategories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await Axios.get(`${REACT_APP_API_URL}/productCategories`)
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_ADMIN_PRODUCT_CATEGORY, payload });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Tbody>
      {categories.map((data, i) => {
        return (
          <Tr key={i}>
            <Td>
              <Flex alignItems={'center'}>
                <Text>{data?.name}</Text>
              </Flex>
            </Td>

            <Td>
              <MenuLItems name={data?.name} data={data} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

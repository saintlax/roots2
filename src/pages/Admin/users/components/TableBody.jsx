import { Tr, Tbody, Td, Avatar, Flex, Text, Checkbox } from '@chakra-ui/react';
import { useEffect } from 'react';
// import { tableBodyData } from './tableBodyData';
// import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { MenuLItems } from './MenuList';
import Axios from 'axios';
import { ActionTypes } from '../../../../redux/constants/action-types';
import { formatCurrency } from '../../../../constants/constants';
const { REACT_APP_API_URL } = process.env;

export const TableBody = () => {
  // const adminSummary = useSelector((state) => state.adminSummary);
  // const tableBodyData = adminSummary.allUsers || [];
  const tableBodyData = useSelector((state) => state.allUsers.users);
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await Axios.get(`${REACT_APP_API_URL}/users`)
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_ALL_USERS, payload });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                <Avatar
                  size={'sm'}
                  name={
                    data?.firstName +
                    ' ' +
                    data?.lastName +
                    ' ' +
                    data?.middleName
                  }
                  src={data?.imageUrl}
                  mr='5px'
                />
                <Text>{data?.firstName + ' ' + data?.lastName}</Text>
              </Flex>
            </Td>
            <Td>{data?.email}</Td>
            <Td>{data?.phoneNumber}</Td>
            <Td>{formatCurrency(data?.loanAmount)}</Td>
            <Td>
              <Text
                color={'#009A49'}
                bg='#F3FCF7'
                borderRadius={'5px'}
                p='5px 8px'
              >
                {data?.type}
              </Text>
            </Td>
            <Td
            // position={["sticky", "unset"]} right={["-3%", 0]} marginTop={["-30px", 0]}
            >
              <MenuLItems data={data} />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

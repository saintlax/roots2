import { Tr, Tbody, Td, Flex, Text, Tooltip, Circle } from '@chakra-ui/react';
import { MdHeadset } from 'react-icons/md';
import { MenuLItems } from './MenuList';
import { useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
export const TableBody = () => {
  const products = useSelector((state) => state.products.products);
  const merchant = useSelector((state) => state.merchant);
  const userBranch = useSelector((state) => state.userBranch);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    //&branchId=${this.branch.id
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `${userBranch.merchantId}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      query = `${merchant.id}`;
    }
    await Axios.get(
      `${REACT_APP_API_URL}/products/filter/filter?merchantId=${query}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_PRODUCTS, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Tbody>
      {products.map((data, i) => {
        return (
          <Tr key={i}>
            <Tooltip label={data?.name}>
              <Td
                isTruncated
                px={['20px !important', '40px !important']}
                fontSize={['14px']}
              >
                <Flex alignItems={'center'}>
                  <Circle bg={'#fbf5ef'} size='30px' mr='10px'>
                    <MdHeadset size={'16px'} />
                  </Circle>
                  <Text isTruncated>{data?.name}</Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={data?.description}>
              <Td
                isTruncated
                maxWidth={'150px'}
                px={['20px !important', '40px !important']}
                fontSize={['14px']}
              >
                <Flex alignItems={'center'}>
                  <Text>{data?.description}</Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={data?.category}>
              <Td
                px={['20px !important', '40px !important']}
                fontSize={['14px']}
              >
                {data?.category}
              </Td>
            </Tooltip>
            <Tooltip label={data?.branch?.name}>
              <Td
                isTruncated
                maxWidth={'150px'}
                px={['20px !important', '40px !important']}
                fontSize={['14px']}
              >
                {data?.branch?.name}
              </Td>
            </Tooltip>
            <Td px={['20px !important', '40px !important']} fontSize={['14px']}>
              {data?.qty}
            </Td>
            <Td px={['20px !important', '40px !important']} fontSize={['14px']}>
              {data?.price}
            </Td>

            <Td px={['20px !important', '40px !important']} fontSize={['14px']}>
              <MenuLItems
                name={data?.name}
                dateCreated={data?.CreatedOn}
                product={data}
              />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

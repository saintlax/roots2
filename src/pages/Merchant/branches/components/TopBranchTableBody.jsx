import { Tr, Tbody, Td, Text, Tooltip } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';

import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
const { REACT_APP_API_URL } = process.env;

// import { BsThreeDots } from "react-icons/bs";
// import { MenuLItems } from "./MenuList";

export const TopBranchTableBody = () => {
  const products = useSelector((state) => state.products.topSelling);
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    //&branchId=${this.branch.id
    await Axios.get(`${REACT_APP_API_URL}/products/topSelling/${merchant.id}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;

          console.log('LOADING topselling Products......', payload.length);
          dispatch({ type: ActionTypes.REFRESH_TOPSELLING_PRODUCTS, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Tbody>
      {products?.slice(0, 5).map((data, i) => {
        return (
          <Tr key={i}>
            <Td fontSize={['12px']}>{i + 1}</Td>
            <Tooltip label={data?.name}>
              <Td fontSize={['12px']}>
                <Text isTruncated>{data?.name}</Text>
              </Td>
            </Tooltip>
            <Tooltip label={data?.name}>
              <Td fontSize={['12px']}>
                <Text isTruncated>{data?.name}</Text>
              </Td>
            </Tooltip>
            <Tooltip label={data?.branch?.name}>
              <Td isTruncated fontSize={['12px']}>
                {data?.branch?.name}
              </Td>
            </Tooltip>
            <Td fontSize={['12px']}>{data?.revenue}</Td>

            <Td fontSize={['12px']}>{data?.orders}</Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

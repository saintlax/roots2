import { Tr, Tbody, Td, Flex, Text, Tooltip, Circle } from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';
import { MdHeadset } from 'react-icons/md';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
const { REACT_APP_API_URL } = process.env;

export const TopProductTableBody = () => {
  const products = useSelector((state) => state.products.topSelling);
  const merchant = useSelector((state) => state.merchant);
  const userBranch = useSelector((state) => state.userBranch);

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      //query = `/filter/filter?branchId=${userBranch.id}&merchantId=${userBranch.merchantId}`;
      query = `/products/topSellingBranchProducts/${userBranch.merchantId}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      //query = `/filter/filter?merchantId=${merchant.id}`;
      query = `/products/topSellingMerchantProducts/${merchant.id}`;
    }
    //&branchId=${this.branch.id
    await Axios.get(`${REACT_APP_API_URL}${query}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;

          console.log('LOADING topselling Products......', payload);
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
      {products.slice(0, 5).map((data, i) => {
        return (
          <Tr key={i}>
            <Td fontSize={['12px']} py='20px !important'>
              {i + 1}
            </Td>
            <Tooltip label={data?.name}>
              <Td fontSize={['12px']} py='20px !important'>
                <Flex alignItems={'center'}>
                  <Circle bg={'#fbf5ef'} size='30px' mr='10px'>
                    <MdHeadset size={'16px'} />
                  </Circle>
                  <Text isTruncated>{data?.name}</Text>
                </Flex>
              </Td>
            </Tooltip>
            <Tooltip label={data?.price}>
              <Td fontSize={['12px']} py='20px !important'>
                <Text isTruncated>{data?.price}</Text>
              </Td>
            </Tooltip>
            <Tooltip label={data?.orders}>
              <Td isTruncated fontSize={['12px']} py='20px !important'>
                {data?.orders}
              </Td>
            </Tooltip>
            <Td fontSize={['12px']} py='20px !important'>
              #{data?.revenue}
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

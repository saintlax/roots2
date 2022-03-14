import {
  Tr,
  Tbody,
  Td,
  Avatar,
  Flex,
  Text,
  Checkbox,
  Tooltip,
} from '@chakra-ui/react';
import { tableBodyData } from './tableBodyData';

// import { BsThreeDots } from "react-icons/bs";
// import { MenuLItems } from "./MenuList";

export const TopBranchTableBody = () => {
  return (
    <Tbody>
      {tableBodyData?.slice(0, 5).map((data, i) => {
        return (
          <Tr key={i}>
            <Td fontSize={['12px']}>{i + 1}</Td>
            <Tooltip label={data?.address}>
              <Td fontSize={['12px']}>
                <Text isTruncated>{data?.address}</Text>
              </Td>
            </Tooltip>
            <Tooltip label={data?.name}>
              <Td fontSize={['12px']}>
                <Text isTruncated>{data?.name}</Text>
              </Td>
            </Tooltip>
            <Tooltip label={data?.address}>
              <Td isTruncated fontSize={['12px']}>
                {data?.address}
              </Td>
            </Tooltip>
            <Td fontSize={['12px']}>{data?.amount}</Td>

            <Td fontSize={['12px']}>{data?.totalOrders}</Td>
          </Tr>
        );
      })}
    </Tbody>
  );
};

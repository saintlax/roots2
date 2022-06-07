import {
  Box,
  Button,
  Flex,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import IsMobile from '../../../components/common/IsMobile';
import Doghnut from '../products/components/Dognut';
import { BranchSummary } from './components/BranchSummary';
import { Dropdown } from './components/Dropdown';
import { OrdersTable } from './components/OrdersTable';
import { AiOutlinePlus } from 'react-icons/ai';
import { AddBranchModal } from './components/AddBranchModal';
import { AddRolesModal } from './components/AddRolesModal.jsx';
import BranchDoghnut from './components/BranchDonut';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
export const Branches = () => {
  const isMobile = IsMobile();
  const userBranch = useSelector((state) => state.userBranch);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const onStatusSelected = (value) => {
    console.log('====================================');
    console.log(value);
    console.log('====================================');
  };

  const ShowAddBranchModal = () => {
    console.log('=========uuuuuuuuuuu===========================');
    console.log(userBranch);
    console.log('====================================');
    if (userBranch.id == -1) {
      if (isMobile) {
        return (
          <Button size='sm' bg='primary'>
            <AddBranchModal isMobile={isMobile} />
          </Button>
        );
      } else {
        return (
          <Button size='sm' bg={'#1459DF'} color='#fff'>
            <AddBranchModal isMobile={isMobile} />
          </Button>
        );
      }
    }
    return <></>;
  };

  const merchant = useSelector((state) => state.merchant);

  useEffect(() => {
    getReports();
  }, []);
  const getReports = async () => {
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `branchId=${userBranch.merchantId}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      query = `merchantId=${merchant.id}`;
    }
    await Axios.get(
      `${REACT_APP_API_URL}/loanproducts/orderReports/params?${query}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          setTotalRevenue(payload.totalRevenue);
          setTotalOrders(payload.totalOrders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack w='100%' h='100%'>
      {/* <HStack justify='space-between' py='5'>
        <Text as='h2'>Products Summary</Text>
        {isMobile ? (
          <Button size='sm' bg='primary'>
            <AddBranchModal isMobile={isMobile} />
          </Button>
        ) : (
          <Button size='sm' bg={'#1459DF'} color='#fff'>
            <AddBranchModal isMobile={isMobile} />
          </Button>
        )}
      </HStack> */}

      <Flex pt='5' pb='3' align='center' justify='space-between'>
        <Text as='h2'>Branches</Text>
        <Box>
          <HStack justify='space-between' py='5'>
            {/* <Dropdown onStatusSelected={onStatusSelected} /> */}
            {isMobile ? (
              <Button size='sm' bg='primary'>
                <AddRolesModal isMobile={isMobile} />
              </Button>
            ) : (
              <Button size='sm' bg={'#1459DF'} color='#fff'>
                <AddRolesModal isMobile={isMobile} />
              </Button>
            )}
            {isMobile ? (
              <Button size='sm' bg='primary'>
                <AddBranchModal isMobile={isMobile} />
              </Button>
            ) : (
              <Button size='sm' bg={'#1459DF'} color='#fff'>
                <AddBranchModal isMobile={isMobile} />
              </Button>
            )}
          </HStack>
        </Box>
      </Flex>
      <Box>
        <OrdersTable />
      </Box>
      <HStack justify='space-between' py='5'>
        <Text as='h2'>Products Summary</Text>
      </HStack>
      <Flex
        gap='5'
        maxW='100%'
        direction={['column', 'column', 'column', 'row']}
        justify='space-between'
      >
        <BranchSummary />

        {totalOrders > 0 || totalRevenue > 0 ? (
          <Flex
            maxW={['', '', '', '30%']}
            bg='#fff'
            borderRadius={'10px'}
            p='5'
            direction={['column', 'row', 'row', 'column']}
            align={['center']}
          >
            <Box
              w={['100%', '300px', '50%', '100%']}
              h={['100%', '', '200px', '220px']}
              mx={['auto']}
            >
              <BranchDoghnut
                totalOrders={totalOrders}
                totalRevenue={totalRevenue}
              />
            </Box>
            <UnorderedList
              w='100%'
              styleType='disc'
              display='flex'
              flexDirection={['row', 'column', '', 'row']}
              justifyContent={[
                'space-evenly',
                'center',
                'canter',
                'space-evenly',
              ]}
              alignItems={['center', '', 'start']}
              flexWrap='wrap'
            >
              <ListItem>
                <Text as='span' pos='relative' left='-10px' top='-4px'>
                  Total Order
                </Text>
              </ListItem>
              <ListItem>
                <Text as='span' pos='relative' left='-10px' top='-4px'>
                  Total Revenue
                </Text>
              </ListItem>
            </UnorderedList>
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
    </Stack>
  );
};

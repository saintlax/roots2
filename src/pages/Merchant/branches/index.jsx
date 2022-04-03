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
import React from 'react';
import IsMobile from '../../../components/common/IsMobile';
import Doghnut from '../products/components/Dognut';
import { BranchSummary } from './components/BranchSummary';
import { Dropdown } from './components/Dropdown';
import { OrdersTable } from './components/OrdersTable';
import { AiOutlinePlus } from 'react-icons/ai';
import { AddBranchModal } from './components/AddBranchModal';
import { AddRolesModal } from './components/AddRolesModal.jsx';
export const Branches = () => {
  const isMobile = IsMobile();
  const onStatusSelected = (value) => {
    console.log('====================================');
    console.log(value);
    console.log('====================================');
  };

  return (
    <Stack w='100%' h='100%'>
      <HStack justify='space-between' py='5'>
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
      </HStack>
      <Flex
        gap='5'
        maxW='100%'
        direction={['column', 'column', 'column', 'row']}
        justify='space-between'
      >
        <BranchSummary />

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
            <Doghnut />
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
      </Flex>

      <Flex pt='5' pb='3' align='center' justify='space-between'>
        <Text as='h2'>Branches</Text>
        <Box>
          <HStack justify='space-between' py='5'>
            <Dropdown onStatusSelected={onStatusSelected} />
            {isMobile ? (
              <Button size='sm' bg='primary'>
                <AddRolesModal isMobile={isMobile} />
              </Button>
            ) : (
              <Button size='sm' bg={'#1459DF'} color='#fff'>
                <AddRolesModal isMobile={isMobile} />
              </Button>
            )}
          </HStack>
        </Box>
      </Flex>
      <Box>
        <OrdersTable />
      </Box>
    </Stack>
  );
};

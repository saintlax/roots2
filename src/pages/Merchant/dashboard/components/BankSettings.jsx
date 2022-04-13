import { Button, Flex, HStack, Img, Stack, Text } from '@chakra-ui/react';
import {
  AiOutlinePlus,
  AiFillCheckSquare,
  AiOutlineAlert,
} from 'react-icons/ai';
//import firstBank from '../../../../assets/icons/firstbank.png';
import { useState } from 'react';
import { EditBankModal } from './EditBankModal';
import { useSelector, useDispatch } from 'react-redux';

const BankSettings = () => {
  const merchant = useSelector((state) => state.merchant);

  return (
    <Stack spacing='5' pt='5' minH='50vh'>
      <HStack justify='space-between'>
        <Text as='h3'>Bank Information</Text>
        <Button bg='primary' color='#fff'>
          <EditBankModal merchant={merchant} />
        </Button>
      </HStack>
      <Flex
        gap='3'
        p='2'
        align='center'
        borderRadius='5px'
        border='1px solid #eee'
      >
        {/* <Img src={firstBank} alt='bank' /> */}
        <AiFillCheckSquare />
        <Text as='small'>
          {merchant?.nameOfBank} ({merchant?.businessAcountNumber})
        </Text>
        <Text as='small'>Account Name: {merchant?.bankAcountName}</Text>
      </Flex>
    </Stack>
  );
};

export default BankSettings;

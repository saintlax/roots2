import { Button, Flex, HStack, Img, Stack, Text } from '@chakra-ui/react';
import {
  AiOutlinePlus,
  AiFillCheckSquare,
  AiOutlineAlert,
} from 'react-icons/ai';
//import firstBank from '../../../../assets/icons/firstbank.png';
import { useState, useEffect } from 'react';
import { EditBankModal } from './EditBankModal';
import { useSelector, useDispatch } from 'react-redux';
import { EditStaffBankModal } from './EditStaffBankModal';
import Axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
const BankSettings = () => {
  const merchant = useSelector((state) => state.merchant);
  const userBranch = useSelector((state) => state.userBranch);
  const user = useSelector((state) => state.user);
  const [bankAccount, setBankAccount] = useState({});
  const ShowBankAccount = () => {
    if (userBranch && Object.keys(userBranch).length > 0) {
      return (
        <>
          <Text as='small'>
            {bankAccount?.nameOfBank} ({bankAccount?.accountNumber})
          </Text>
          <Text as='small'>Account Name: {bankAccount?.accountName}</Text>
        </>
      );
    } else if (merchant && Object.keys(merchant).length > 0) {
      return (
        <>
          <Text as='small'>
            {merchant?.nameOfBank} ({merchant?.businessAcountNumber})
          </Text>
          <Text as='small'>Account Name: {merchant?.bankAcountName}</Text>
        </>
      );
    }
    return <></>;
  };
  const BankModal = () => {
    if (userBranch && Object.keys(userBranch).length > 0) {
      return (
        <EditStaffBankModal
          staff={userBranch}
          bankAccount={bankAccount}
          onBankAccountUpdate={onBankAccountUpdate}
        />
      );
    } else if (merchant && Object.keys(merchant).length > 0) {
      return <EditBankModal merchant={merchant} />;
    }
    return <></>;
  };
  useEffect(() => {
    getBankAccount();
  }, []);
  const getBankAccount = async () => {
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `userId=${user.id}`;
    } else {
      return;
    }
    await Axios.get(`${REACT_APP_API_URL}/bankAccounts/filter/filter?${query}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          if (payload && payload.length > 0) {
            setBankAccount(payload[payload.length - 1]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onBankAccountUpdate = (data) => {
    setBankAccount(data);
  };

  return (
    <Stack spacing='5' pt='5' minH='50vh'>
      <HStack justify='space-between'>
        <Text as='h3'>Bank Information</Text>
        <Button bg='primary' color='#fff'>
          {/* <EditBankModal merchant={merchant} /> */}
          <BankModal />
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
        <ShowBankAccount />
      </Flex>
    </Stack>
  );
};

export default BankSettings;

import { Box, Button, Stack, Text, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import IsMobile from '../../../components/common/IsMobile';
import { AddWithdrawalModal } from './components/addWithdrawalModal';
import { Summary } from './components/Summary';
import './withdrawal.css';
import Axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency } from '../../../constants/constants';
import CustomModal from '../../../components/common/CustomModal';
import { FiSettings } from 'react-icons/fi';
import Settings from '../../../pages/Merchant/dashboard/components/Settings';
const { REACT_APP_API_URL } = process.env;
export const Withdrawals = () => {
  const isMobile = IsMobile();
  const [wallet, setWallet] = useState({});
  const user = useSelector((state) => state.user);
  //const [hasBankAccount, setHasBankAccount] = useState(false);
  const bankAccounts = useSelector((state) => state.bankAccounts.accounts);

  
  useEffect(() => {
    getWallet();
  //  getBankAccount();
  }, []);
/*
  const getBankAccount = async () => {
    let query = `userId=${user.id}`;
    await Axios.get(`${REACT_APP_API_URL}/bankAccounts/filter/filter?${query}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          if (payload && payload.length > 0) {
            setHasBankAccount(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  */
  const getWallet = async () => {
    await Axios.get(
      `${REACT_APP_API_URL}/wallets/filter/filter?userId=${user.id}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          if (payload && payload.length > 0) {
            setWallet(payload[payload.length - 1]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onWalletChange = (wallet) => {
    setWallet(wallet);
  };

  const SettingsModal = () => {
    return (
      <CustomModal
        btnIcon={<FiSettings size={26} />}
        btnTitle='Settings'
        title={'Settings'}
      >
        <Settings />
      </CustomModal>
    );
  };

  const ShowWithdrawalButton = () => {
    // if (!hasBankAccount && bankAccounts.length === 0) {
    if(!user.bankAccounts || user.bankAccounts.length == 0){  
      return (
        <Text color='red'>
          Go to "SETTINGS" =&#62; "Bank Settings" to add bank account
        </Text>
      );
    }
    if (isMobile) {
      return (
        <Button size='sm' bg='primary'>
          <AddWithdrawalModal
            isMobile={isMobile}
            wallet={wallet}
            onWalletChange={onWalletChange}
          />
        </Button>
      );
    } else {
      return (
        <Button size='sm' bg={'#1459DF'} color='#fff'>
          <AddWithdrawalModal
            isMobile={isMobile}
            wallet={wallet}
            onWalletChange={onWalletChange}
          />
        </Button>
      );
    }
  };
  return (
    <Stack w='100%' h='100%'>
      <HStack justify='space-between' py='5'>
        <Text as='h2'>
          Current balance:{' '}
          {wallet?.amount ? formatCurrency(wallet?.amount) : '0.00'}
        </Text>

        <ShowWithdrawalButton />
        {/* {isMobile ? (
          <Button size='sm' bg='primary'>
            <AddWithdrawalModal
              isMobile={isMobile}
              wallet={wallet}
              onWalletChange={onWalletChange}
            />
          </Button>
        ) : (
          <Button size='sm' bg={'#1459DF'} color='#fff'>
            <AddWithdrawalModal
              isMobile={isMobile}
              wallet={wallet}
              onWalletChange={onWalletChange}
            />
          </Button>
        )} */}
      </HStack>
      <Stack className='products-page-grid'>
        <Box className='product-catalogue'>
          <Summary />
        </Box>
      </Stack>
    </Stack>
  );
};

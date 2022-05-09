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
const { REACT_APP_API_URL } = process.env;
export const Withdrawals = () => {
  const isMobile = IsMobile();
  const [wallet, setWallet] = useState({});
  const user = useSelector((state) => state.user);
  useEffect(() => {
    getWallet();
  }, []);

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
  return (
    <Stack w='100%' h='100%'>
      <HStack justify='space-between' py='5'>
        <Text as='h2'>
          Current balance:{' '}
          {wallet?.amount ? formatCurrency(wallet?.amount) : '0.00'}
        </Text>

        {isMobile ? (
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
        )}
      </HStack>
      <Stack className='products-page-grid'>
        <Box className='product-catalogue'>
          <Summary />
        </Box>
      </Stack>
    </Stack>
  );
};

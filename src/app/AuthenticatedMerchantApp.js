import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { PROTECTED_PATHS } from './merchantConstants';
import { Dashboard } from '../pages/Merchant/dashboard';
import { Orders } from '../pages/Merchant/orders';
import { Products } from '../pages/Merchant/products';
import { Branches } from '../pages/Merchant/branches';
// import Notifications from '../pages/Merchant/notifications';
import { Nav } from '../components/nav';

const AuthenticatedMerchantApp = () => {
  const { DASHBOARD, ORDERS, PRODUCTS, BRANCHES } = PROTECTED_PATHS;

  return (
    <Box w='100%' h='100%'>
      <Nav />
      <Box bg='#fafafa' minW='100%' minH='100%'>
        <Box
          bg='#fafafa'
          display='flex'
          w='100%'
          h='100%'
          pl={['3%', '9%']}
          pr={['3%', '7%']}
        >
          <Routes>
            <Route path={BRANCHES} element={<Branches />} />
            <Route path={DASHBOARD} element={<Dashboard />} />
            <Route path={ORDERS} element={<Orders />} />
            <Route path={PRODUCTS} element={<Products />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthenticatedMerchantApp;

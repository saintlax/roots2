import { Box, Flex, HStack, Stack } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import { PROTECTED_PATHS } from './constants';

import Dashboard from '../pages/dashboard';
import Users from '../pages/users';
import Merchants from '../pages/merchants';
import Transactions from '../pages/transactions';
import Settings from '../pages/settings';
import Roles from '../pages/roles';
import IsMobile from '../components/common/IsMobile';
import Headerbar from '../components/headerbar';
import Menu from '../components/menu';
import Loans from '../pages/loans';

const AuthenticatedApp = () => {
  const { DASHBOARD, USERS, MERCHANTS, TRANSACTIONS, LOANS, SETTINGS, ROLES } =
    PROTECTED_PATHS;

  const isMobileScreen = IsMobile();

  return (
    <Flex bg='whiteBg'>
      {!isMobileScreen && <Menu />}
      <Stack w='100%'>
        <HStack w='100%'>
          <Headerbar />
        </HStack>

        {/* main page */}

        <Box py={['4']} px={['5']} minH='100vh'>

          <Routes>
            <Route path={DASHBOARD} element={<Dashboard />} />
            <Route path={USERS} element={<Users />} />
            <Route path={MERCHANTS} element={<Merchants />} />
            <Route path={TRANSACTIONS} element={<Transactions />} />
            <Route path={LOANS} element={<Loans />} />
            <Route path={SETTINGS} element={<Settings />} />
            <Route path={ROLES} element={<Roles />} />
          </Routes>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AuthenticatedApp;

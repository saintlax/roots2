import { Box, Flex, HStack, Stack, useBoolean } from '@chakra-ui/react';
import { Routes, Route, Link } from 'react-router-dom';

import { PROTECTED_PATHS } from './constants';
import Headerbar from '../components/headerbar';
import Sidebar from '../components/sidebar';
import Dashboard from '../pages/dashboard';
import Users from '../pages/users';
import Marchants from '../pages/marchants';
import Transactions from '../pages/transactions';
import Settings from '../pages/settings';
import Roles from '../pages/roles';

const AuthenticatedApp = () => {
  const { DASHBOARD, USERS, MARCHANTS, TRANSACTIONS, SETTINGS, ROLES } =
    PROTECTED_PATHS;
  const [showMenu, setShowMenu] = useBoolean();
  return (
    <Flex bg='whiteBg'>
      <Sidebar showMenu={showMenu} />

      <Stack w='100%'>
        <HStack w='100%'>
          <Headerbar setShowMenu={setShowMenu.toggle} />
        </HStack>

        {/* main page */}
        <Box bg='red'>
          <Routes>
            <Route path={DASHBOARD} element={<Dashboard />} />
            <Route path={USERS} element={<Users />} />
            <Route path={MARCHANTS} element={<Marchants />} />
            <Route path={TRANSACTIONS} element={<Transactions />} />
            <Route path={SETTINGS} element={<Settings />} />
            <Route path={ROLES} element={<Roles />} />
          </Routes>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AuthenticatedApp;

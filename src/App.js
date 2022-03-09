import { useEffect, useState } from 'react';
import './App.css';
import AuthenticatedApp from './app/AuthenticatedApp';
import UnAuthenticatedApp from './app/UnAuthenticatedApp';

import { useLocation } from 'react-router-dom';
import UnAuthenticatedMerchantApp from './app/UnAuthenticatedMerchantApp';
import AuthenticatedMerchantApp from './app/AuthenticatedMerchantApp';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { pathname } = useLocation();

  console.log('appjs ', pathname);
  // if (pathname === '/dashboard') {
  //   setIsLoggedIn(true);
  // }

  useEffect(() => {
    pathname !== '/' ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [pathname]);

  if (isLoggedIn) {
    return <AuthenticatedMerchantApp />;
  }
  return <UnAuthenticatedMerchantApp />;
}

export default App;

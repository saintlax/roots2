import { useContext, useEffect, useState } from 'react';
import './App.css';
import AuthenticatedApp from './app/AuthenticatedApp';
import UnAuthenticatedApp from './app/UnAuthenticatedApp';
import { useLocation } from 'react-router-dom';
import AuthenticatedMerchantApp from './app/AuthenticatedMerchantApp';

import { Context } from './context/userAuthContext/userTypeContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();
  const { userType } = useContext(Context);

  console.log({ userType }, 'appjs', { isLoggedIn });

  useEffect(() => {
    pathname !== '/' &&
    pathname !== 'forgot-password' &&
    pathname !== '/signup' &&
    pathname !== '/account-setup' &&
    pathname !== '/bank-information'
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
  }, [pathname]);

  if (isLoggedIn) {
    if (userType?.toLowerCase() === 'admin') {
      return <AuthenticatedApp />;
    } else if (userType?.toLowerCase() === 'merchant') {
      return <AuthenticatedMerchantApp />;
    }
  } else {
    return <UnAuthenticatedApp />;
  }
}

export default App;

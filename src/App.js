import { useContext, useEffect, useState } from 'react';
import './App.css';
import AuthenticatedApp from './app/AuthenticatedApp';
import UnAuthenticatedApp from './app/UnAuthenticatedApp';
import { useLocation } from 'react-router-dom';
import AuthenticatedMerchantApp from './app/AuthenticatedMerchantApp';

import { Context } from './context/userAuthContext/userTypeContext';
const { REACT_APP_USER, REACT_APP_USER_BRANCH, REACT_APP_MERCHANT } =
  process.env;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();
  const { userType } = useContext(Context);
  const user = localStorage.getItem(REACT_APP_USER);
  const staffUser = localStorage.getItem(REACT_APP_USER_BRANCH);
  const merchantUser = localStorage.getItem(REACT_APP_MERCHANT);

  console.log({ userType }, 'appjs', { isLoggedIn });

  useEffect(() => {
    pathname !== '/' &&
    pathname !== 'forgot-password' &&
    pathname !== 'reset-password' &&
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
    } else if (userType?.toLowerCase() === 'none') {
      if (user && JSON.stringify(user) !== '') {
        const loggedUser = JSON.parse(user);
        if (loggedUser?.type === 'ADMIN') {
          return <AuthenticatedApp />;
        } else if (
          (staffUser && JSON.stringify(staffUser)) ||
          (merchantUser && JSON.stringify(merchantUser))
        ) {
          return <AuthenticatedMerchantApp />;
        } else {
          return <UnAuthenticatedApp />;
        }
      } else return <UnAuthenticatedApp />;
    } else {
      return <UnAuthenticatedApp />;
    }
  } else {
    return <UnAuthenticatedApp />;
  }
}

export default App;

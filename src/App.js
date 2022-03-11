import { useContext, useEffect, useState } from 'react';
import './App.css';
import AuthenticatedApp from './app/AuthenticatedApp';
import UnAuthenticatedApp from './app/UnAuthenticatedApp';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthenticatedMerchantApp from './app/AuthenticatedMerchantApp';


import { Context } from './context/userAuthContext/userTypeContext';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userType, setUserType] = useState('merchant');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userType } = useContext(Context);
  console.log('appjs ', pathname);

  // if (pathname === '/dashboard') {
  //   setIsLoggedIn(true);
  // }

  console.log({ userType }, 'appjs', { isLoggedIn });

  useEffect(() => {
    pathname !== '/' && pathname !== 'forgot-password'
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

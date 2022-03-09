import { useState } from 'react';
import './App.css';
import AuthenticatedApp from './app/AuthenticatedApp';
import UnAuthenticatedApp from './app/UnAuthenticatedApp';

import { useLocation } from 'react-router-dom';
import UnAuthenticatedMerchantApp from './app/UnAuthenticatedMerchantApp';
import AuthenticatedMerchantApp from './app/AuthenticatedMerchantApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { pathname } = useLocation();

  console.log('appjs ', pathname);
  // if (pathname === '/dashboard') {
  //   setIsLoggedIn(true);
  // }

  if (isLoggedIn) {
    return <AuthenticatedMerchantApp />;
  }
  return <UnAuthenticatedMerchantApp />;
}

export default App;

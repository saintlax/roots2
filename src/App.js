import { useState } from 'react';
import './App.css';
import AuthenticatedApp from './app/AuthenticatedApp';
import UnAuthenticatedApp from './app/UnAuthenticatedApp';
import { useLocation } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { pathname } = useLocation();

  console.log('appjs ', pathname);
  // if (pathname === '/dashboard') {
  //   setIsLoggedIn(true);
  // }

  if (isLoggedIn) {
    return <AuthenticatedApp />;
  }
  return <UnAuthenticatedApp />;
}

export default App;

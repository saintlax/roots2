import { Routes, Route } from 'react-router-dom';
import { PUBLIC_PATHS } from './constants';
import Login from '../pages/login';
import ForgotPassword from '../pages/Admin/forgotPassword';
// import { CheckEmail } from './../pages/forgotPassword/checkYourEmail/index';

const UnAuthenticatedApp = () => {
  const { LOGIN, FORGOTPASSWORD, CHECKEMAIL } = PUBLIC_PATHS;
  return (
    <Routes>
      <Route path={LOGIN} element={<Login />} />
      <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
      {/* <Route path={CHECKEMAIL} element={CheckEmail} /> */}
    </Routes>
  );
};

export default UnAuthenticatedApp;

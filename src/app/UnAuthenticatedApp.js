import { Routes, Route } from 'react-router-dom';
import { PUBLIC_PATHS } from './constants';
import Login from '../pages/login';
import ForgotPassword from '../pages/Admin/forgotPassword';
import Signup from '../pages/login/components/Signup';
import { AccountSetup } from '../pages/login/components/AccountSetup';
import { BankInformation } from '../pages/login/components/BankInformation';
import ResetPassword from '../pages/Admin/resetPassword/resetPassword';
import { VerifyEmail } from '../pages/login/components/VerifyEmail';

const UnAuthenticatedApp = () => {
  const {
    LOGIN,
    FORGOTPASSWORD,
    SIGNUP,
    ACCOUNT_SETUP,
    BANK_INFORMATION,
    RESETPASSWORD,
    VERIFY_EMAIL,
  } = PUBLIC_PATHS;
  return (
    <Routes>
      <Route path={LOGIN} element={<Login />} />
      <Route path={SIGNUP} element={<Signup />} />
      <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route path={ACCOUNT_SETUP} element={<AccountSetup />} />
      <Route path={BANK_INFORMATION} element={<BankInformation />} />
      <Route path={RESETPASSWORD} element={<ResetPassword />} />
      <Route
        path={VERIFY_EMAIL}
        element={<VerifyEmail success={false} setSuccess={false} />}
      />
    </Routes>
  );
};

export default UnAuthenticatedApp;

import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/userAuthContext/userTypeContext';

import bgImage from '../assets/background.png';
import { SignupForm } from './SignupForm';
import { VerifyEmail } from './VerifyEmail';
import { SignupType } from './signupType';
import { SignupUserForm } from './SignupUserForm';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const { setUserType } = useContext(Context);

  const [verifyEmail, setVerifyEmail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [asUser, setAsUser] = useState(false);
  const [asMerchant, setAsMerchant] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setUserType(email.toLowerCase() === 'admin' ? 'admin' : 'merchant');
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    email && password ? setIsDisable(false) : setIsDisable(true);
  }, [email, password]);

  const proceedMerchant = (action) => {
    setAsMerchant(action);
    setAsUser(!action);
  };
  const proceedUser = (action) => {
    setAsUser(action);
    setAsMerchant(!action);
  };
  function Proceed() {
    if (asMerchant)
      return (
        <SignupForm
          show={show}
          setShow={setShow}
          setPassword={setPassword}
          setEmail={setEmail}
          disable={disable}
          handleLogin={handleLogin}
          setVerifyEmail={setVerifyEmail}
        />
      );
    if (asUser)
      return <SignupUserForm disable='true' setVerifyPhone={setVerifyPhone} />;
  }

  const setVerifyPhone = (action) => {};
  return (
    <Flex
      w='100%'
      h={['100%']}
      // bg="primary"
      alignItems={'center'}
      direction={['column', 'column', 'row']}
    >
      <Box
        width={['100%', '100%', '50%']}
        h={['50vh', '50vh', '100vh']}
        backgroundImage={bgImage}
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        padding={['20px', '50px']}
      >
        <Box position={'relative'} height='100%'>
          <Box position={'absolute'} bottom='0%'>
            <Heading
              as='h3'
              color={'#fff'}
              fontSize={['22px', '24px', '36px']}
              mb='10px'
            >
              Register your store on Roots
            </Heading>
            <Text color={'#fff'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              condimentum risus, eget in at rhoncus vitae. Enim in ullamcorper
              ut pulvinar. Interdum cursus nibh quam elit nunc donec neque.{' '}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box width={['100%', '100%', '50%']}>
        {/* {verifyEmail ? (
          <>
            <VerifyEmail setSuccess={setSuccess} success={success} />
          </>
        ) : (
          <SignupForm
            show={show}
            setShow={setShow}
            setPassword={setPassword}
            setEmail={setEmail}
            disable={disable}
            handleLogin={handleLogin}
            setVerifyEmail={setVerifyEmail}
          />
        )} */}
        {!asMerchant && !asUser ? (
          <SignupType asMerchant={proceedMerchant} asUser={proceedUser} />
        ) : (
          <Proceed />
        )}
      </Box>
    </Flex>
  );
};

export default Signup;

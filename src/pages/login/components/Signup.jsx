import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/userAuthContext/userTypeContext';

import bgImage from '../assets/background.png';
import { SignupForm } from './SignupForm';
import { VerifyEmail } from './VerifyEmail';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const { setUserType } = useContext(Context);

  const [verifyEmail, setVerifyEmail] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setUserType(email.toLowerCase() === 'admin' ? 'admin' : 'merchant');
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    email && password ? setIsDisable(false) : setIsDisable(true);
  }, [email, password]);

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
<<<<<<< HEAD
        <Box position={"relative"} height="100%">
          <Box position={"absolute"} bottom="0%">
            <Heading as="h3" color={"#fff"} mb="10px">
=======
        <Box position={'relative'} height='100%'>
          <Box position={'absolute'} bottom='0%'>
            <Heading
              as='h3'
              color={'#fff'}
              fontSize={['22px', '24px', '36px']}
              mb='10px'
            >
>>>>>>> 5622918b8ffe7e316ff3cb98e8bbdc6a97ea6832
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
        {verifyEmail ? (
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
        )}
      </Box>
    </Flex>
  );
};

export default Signup;

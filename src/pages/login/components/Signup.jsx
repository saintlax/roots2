import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/userAuthContext/userTypeContext';

import bgImage from '../assets/background.png';
import { SignupForm } from './SignupForm';
// import { VerifyEmail } from './VerifyEmail';
// import { SignupType } from './signupType';
import { SignupUserForm } from './SignupUserForm';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { ConfirmUserForm } from './ConfirmUserForm';

const { REACT_APP_API_URL, REACT_APP_USER, REACT_APP_MERCHANT } = process.env;

const Signup = () => {
  const [merchantFirst, setMerchantFirst] = useState(false);
  const [merchantSecond, setMerchantSecond] = useState(false);
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const { setUserType } = useContext(Context);

  const [asUser, setAsUser] = useState(false);
  const [asMerchant, setAsMerchant] = useState(false);
  const [userData, setUserData] = useState({});
  const [bvn, setBvn] = useState('');
  const [merchant, setMerchant] = useState({});
  const [merchantFirstFormLoading, setMerchantFirstFormLoading] =
    useState(false);

  const [merchantRegisterFormLoading, setMerchantRegisterFormLoading] =
    useState(false);

  const handleMerchantFirstFormLoading = (state) => {
    setMerchantFirstFormLoading(state);
  };

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
  const handleMerchantFirstForm = (data) => {
    console.log('Merchant', data);
    const payload = {
      BVN: data.BVN,
    };
    setBvn(data.BVN);
    setMerchant(data);
    //since i am not verifying BVN anymore
    // verifyBVN(payload);

    setMerchantFirst(true);
    setUserData({ first_name: 'NULL' });
    setMerchantFirstFormLoading(false);
  };

  const verifyBVN = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/flutterwave`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          setMerchantFirst(true);
          console.log('User Data', response.data.payload);
          setUserData(response.data.payload);
          getToast('Successful', 'Your BVN has been confirmed', 'success');
          setMerchantFirstFormLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Something went wrong', 'error');
        setMerchantFirstFormLoading(false);
      });
  };

  const getToast = (title, description, status) => {
    const color = status === 'success' ? 'blue' : 'red';
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      // variant: 'left-accent',
      position: 'top-right',
      containerStyle: {
        border: '10px solid ' + color,
        backgroundColor: color,
      },
    });
  };

  const handleMerchantRegisterFormLoading = (state) => {
    setMerchantRegisterFormLoading(state);
  };

  function MerchantSignup() {
    if (merchantFirst) {
      return (
        <ConfirmUserForm
          onButtonClick={onRegisterButtonClick}
          userData={userData}
          isLoading={merchantRegisterFormLoading}
          handleMerchantRegisterFormLoading={handleMerchantRegisterFormLoading}
        />
      );
    } else {
      return (
        <SignupForm
          onMerchantFirstForm={handleMerchantFirstForm}
          isLoading={merchantFirstFormLoading}
          handleMerchantFirstFormLoading={handleMerchantFirstFormLoading}
        />
      );
    }
  }
  //I am leaving this if there is need to have user dashboard
  function Proceed() {
    if (asMerchant) {
      if (merchantFirst) {
        return (
          <ConfirmUserForm
            onButtonClick={onRegisterButtonClick}
            userData={userData}
          />
        );
      } else if (merchantSecond) {
      } else {
        return <SignupForm onMerchantFirstForm={handleMerchantFirstForm} />;
      }
    }
    if (asUser)
      return <SignupUserForm disable='true' onVerifyPhone={onVerifyPhone} />;
  }

  const onVerifyPhone = (data) => {
    console.log('onVerifyPhone', data);
  };
  const onRegisterButtonClick = (data) => {
    setUserData({ ...userData, ...data });
    //Its weird that i had to do this twice to update
    setUserData({ ...userData, ...data });
    let payload = {
      ...data,
      type: 'MERCHANT',
    };
    console.log('Completed: ', payload);
    registerUser(payload);
  };

  const registerMerchant = async (user) => {
    const userId = user.id;
    const BVN = user.BVN;
    const payload = { ...merchant, userId, BVN };
    var form_data = new FormData();
    for (var key in payload) {
      form_data.append(key, payload[key]);
    }
    await Axios.post(`${REACT_APP_API_URL}/merchant`, form_data, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('MERCHANT SUCCESS', response);
        getToast(
          'Successful',
          'Your Merchant created successfully.',
          'success'
        );
        navigate('/verify-email'); //dashboard
      })
      .catch((error) => {
        console.log('merchat API ERROR', error);
        getToast('Error', error?.response?.data?.error, 'error');
        setMerchantRegisterFormLoading(false);
      });
  };

  const registerUser = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/users`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          const newUser = response.data.payload;
          localStorage.setItem(REACT_APP_USER, JSON.stringify(newUser));
          registerMerchant(response.data.payload);
          getToast(
            'Successful',
            'Your account has been created successfully',
            'success'
          );
        }
      })
      .catch((err) => {
        console.log('REG ERROR', err);
        getToast('Error', err.response.data.error, 'error');
        setMerchantRegisterFormLoading(false);
      });
  };
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
        <MerchantSignup />
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
        {/* {!asMerchant && !asUser ? (
          <SignupType asMerchant={proceedMerchant} asUser={proceedUser} />
        ) : (
          <Proceed />
        )} */}
      </Box>
    </Flex>
  );
};

export default Signup;

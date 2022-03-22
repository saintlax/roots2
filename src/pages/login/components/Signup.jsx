import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/userAuthContext/userTypeContext';

import bgImage from '../assets/background.png';
import { SignupForm } from './SignupForm';
import { VerifyEmail } from './VerifyEmail';
import { SignupType } from './signupType';
import { SignupUserForm } from './SignupUserForm';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { ConfirmUserForm } from './ConfirmUserForm';
const { REACT_APP_API_URL } = process.env;

const Signup = () => {
  const [merchantFirst, setMerchantFirst] = useState(false);
  const [merchantSecond, setMerchantSecond] = useState(false);
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const { setUserType } = useContext(Context);

  const [verifyEmail, setVerifyEmail] = useState(false);
  const [success, setSuccess] = useState(false);
  const [asUser, setAsUser] = useState(false);
  const [asMerchant, setAsMerchant] = useState(false);
  const [userData, setUserData] = useState({});
  const [bvn, setBvn] = useState('');
  const [merchant, setMerchant] = useState({});

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
    verifyBVN(payload);
  };

  const verifyBVN = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/flutterwave`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          setMerchantFirst(true);
          console.log('User Data', response.data.payload);
          setUserData(response.data.payload);
          getToast('Successful', 'Your BVN has been confirmed', 'success');
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Something went wrong', 'error');
      });
  };

  const getToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      // variant: 'left-accent',
      position: 'top-right',
      containerStyle: {
        border: '10px solid blue',
        backgroundColor: 'blue',
      },
    });
  };

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
      ...userData,
      firstName: userData?.first_name,
      middleName: userData?.middle_name,
      lastName: userData?.last_name,
      phoneNumber: userData?.phone_number,
      dateOfBirth: userData?.date_of_birth,
      LGAOfResidence: userData?.lga_of_residence,
      maritalStatus: userData?.marital_status,
      stateOfResidence: userData?.state_of_residence,
      password: data.password,
      confirmPassword: data.confirmPassword,
      BVN: bvn,
      type: 'MERCHANT',
    };
    delete payload.first_name;
    delete payload.last_name;
    delete payload.middle_name;
    delete payload.id;
    delete payload.phone_number;
    delete payload.date_of_birth;
    delete payload.lga_of_residence;
    delete payload.marital_status;
    delete payload.state_of_residence;
    console.log('Completed: ', payload);
    registerUser(payload);
  };

  const registerMerchant = async (user) => {
    const userId = user.id;
    const payload = { ...merchant, userId };
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
        getToast('Successful', 'Your Merchant created successfully', 'success');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log('merchat API ERROR', error);
      });
  };

  const registerUser = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/users`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
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
        getToast('Error', err.message, 'success');
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

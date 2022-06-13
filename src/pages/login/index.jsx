import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/userAuthContext/userTypeContext';
import bgImage from './assets/background.png';
import { Login } from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
const {
  REACT_APP_API_URL,
  REACT_APP_MERCHANT,
  REACT_APP_USER,
  REACT_APP_USER_BRANCH,
} = process.env;

const Index = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const { setUserType } = useContext(Context);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Please wait..');
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

  const handleLogin = () => {
    if (email && password) {
      const user = { email, password };
      postLogin(user);
    } else {
      getToast('Validation Error', 'Email andd password are required', 'error');
    }
  };

  const processPayload = (payload) => {
    const { id, isActive } = payload;
    if (!isActive) {
      getToast('Access Denied', 'Your account has not been activated', 'error');
      return;
    }
    localStorage.setItem(REACT_APP_USER, JSON.stringify(payload));
    dispatch({
      type: ActionTypes.ADD_USER,
      payload: payload,
    });
    const { merchant, type, isAdmin } = payload;
    if (type === 'ADMIN') {
      // setUserType(email.toLowerCase() === 'admin' ? 'admin' : 'merchant');
      // navigate('/dashboard');
      setUserType('admin');
      navigate('/dashboard');
    }
    if (merchant && type === 'MERCHANT') {
      const { isActive } = merchant[0];

      if (isActive) {
        localStorage.setItem(REACT_APP_MERCHANT, JSON.stringify(merchant[0]));
        dispatch({
          type: ActionTypes.ADD_MERCHANT,
          payload: merchant[0],
        });
        getToast('Hi, welcome', 'Merchant Access granted', 'success');
        setUserType('merchant');
        navigate('/dashboard');
      } else {
        getToast(
          'Access Denied',
          'Your merchant account has been disabled. Contact administrator',
          'error'
        );
      }
    }
    if (type === 'STAFF') {
      const { branches } = payload;
      if (branches && branches.length > 0) {
        const branch = branches[0];
        if (!branch?.isActive) {
          getToast(
            'Access Denied',
            'This branch has been disabled. Contact your merchant administrator',
            'error'
          );
          return;
        }
        localStorage.setItem(REACT_APP_USER_BRANCH, JSON.stringify(branch));
        dispatch({
          type: ActionTypes.ADD_USER_BRANCH,
          payload: branch,
        });
        setUserType('merchant');
        navigate('/dashboard');
      }
    }
  };
  const postLogin = async (user) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/users/login`, user)
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          processPayload(payload);
          setIsLoading(false);
        } else {
          getToast(
            'Unknown',
            'Server replied with: ' + response.status,
            'error'
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
        getToast('Authentication error', error?.response?.data?.error, 'error');
        setIsLoading(false);
      });
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
        <Box position={'relative'} height='100%'>
          <Box position={'absolute'} bottom='0%'>
            <Heading
              fontSize={['22px', '24px', '36px']}
              as='h3'
              color={'#fff'}
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
        <Login
          show={show}
          setShow={setShow}
          setPassword={setPassword}
          setEmail={setEmail}
          disable={disable}
          handleLogin={handleLogin}
          isLoading={isLoading}
          loadingText={loadingText}
        />
      </Box>
    </Flex>
  );
};

export default Index;

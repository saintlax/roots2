import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { Success } from './Success';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const { REACT_APP_API_URL, REACT_APP_USER, REACT_APP_MERCHANT } = process.env;

export const VerifyEmail = ({ success, setSuccess, onVerified }) => {
  const navigate = useNavigate();

  const toast = useToast();
  const [OTP, setOTP] = useState('');
  const [disable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const user = localStorage.getItem(REACT_APP_USER);
  const currentUser = user ? JSON.parse(user) : {};
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };
  const Ref = useRef(null);
  const [timer, setTimer] = useState('00:00:00');
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date()) + 120000;

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        // (hours > 9 ? hours : '0' + hours) +
        //   ':' +
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  };
  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer('00:00:10');

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };
  const verifyOTP = () => {
    // setSuccess(true);
    if (currentUser && currentUser.id) {
      const payload = { phoneNumber: currentUser.phoneNumber, otp: OTP };
      postOTP(payload);
    } else {
      getToast('Error', 'This account was not registered properly', 'error');
    }
  };

  useEffect(() => {
    OTP ? setIsDisable(false) : setIsDisable(true);
  }, [OTP]);

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

  const postOTP = async (payload) => {
    setIsLoading(true);
    await Axios.post(`${REACT_APP_API_URL}/otp/verifyOTP`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          console.log('User Data', response.data.payload);
          let resp = response.data.payload;
          if (resp && resp.id > 0) {
            getToast('Successful', 'Your OTP has been confirmed', 'success');
            const data = { isActive: true };
            enableUser(data);
          } else {
            getToast('Error', 'OTP could not be confirmed', 'error');
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', err?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };

  const createNewOTP = async () => {
    if (!currentUser.id) {
      getToast('Error', 'This account was not registered properly', 'error');
      return;
    }
    setIsLoading(true);
    const payload = { phoneNumber: currentUser.phoneNumber };
    await Axios.post(`${REACT_APP_API_URL}/otp`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          console.log('User Data', response.data.payload);
          getToast(
            'Successful',
            'An OTP has been sent to ' + currentUser.phoneNumber,
            'success'
          );
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', err?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };

  const enableUser = async (payload) => {
    setIsLoading(true);
    await Axios.put(
      `${REACT_APP_API_URL}/users/disable/${currentUser.id}`,
      payload
    )
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          console.log('User Data', response.data.payload);
          // getToast('Successful', 'Your been activaated.', 'success');
          const data = response.data.payload;
          onVerified(data);
          // navigate('/');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', err?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };
  return (
    <Box width={'100%'} px={['3%', '5%', '15%']}>
      {success ? (
        <Success
          title='Email Veified'
          text={'Your account has been created successfully'}
        />
      ) : (
        <>
          <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} my='10px'>
            Verify Email Address
          </Heading>
          <Text textAlign={'center'}>
            Check your email, an OTP Code has been sent to you.
          </Text>
          <Flex justifyContent={'center'} alignItems='center' my='30px'>
            <FaEnvelopeOpenText size={100} color='#88C5FC' />
          </Flex>

          <div class='inputContainer'>
            <input
              type='text'
              class='input'
              placeholder=''
              onChange={(e) => setOTP(e.target.value)}
            />
            <label for='' class='label'>
              Enter OTP
            </label>
          </div>
          <Flex justifyContent={'space-between'} mt='20px'>
            <Text color={'#4A4C4F'}>
              Didn’t get OTP Code, resend in {timer}
            </Text>
            <Text
              color={'#4A4C4F'}
              textAlign={'right'}
              _hover={{ textDecoration: 'underline' }}
              fontSize='0.9rem'
              onClick={createNewOTP}
              cursor='pointer'
            >
              Resend OTP
            </Text>
          </Flex>
          <Button
            width={'100%'}
            my='30px'
            isDisabled={disable}
            onClick={verifyOTP}
            {...NO_SHADOW}
            {...BTN_STYLE}
            isLoading={isLoading}
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
};

import { Box, Button, Heading, Text, Input } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Axios from 'axios';
const { REACT_APP_API_URL, REACT_APP_USER } = process.env;

export const Step1 = ({ step1Data }) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  const [names, setNames] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPaswword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisabled] = useState(true);
  const toast = useToast();

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

  useEffect(() => {
    !email || !password || !names || !phone
      ? setDisabled(true)
      : setDisabled(false);
  }, [email, password, names, phone]);

  const handleForm = (e) => {
    if (!names || !email || !password) {
      getToast('Validation', 'All fields are required', 'error');
      return;
    }
    const split = names.split(' ');

    const data = {
      firstName: split[0] || 'NONE',
      lastName: split[1] || 'NIL',
      email,
      password,
      phoneNumber: phone,
      type: 'MERCHANT',
      middleName: 'NIL',
    };

    registerUser(data);
  };

  const registerUser = async (payload) => {
    setIsLoading(true);
    await Axios.post(`${REACT_APP_API_URL}/users/step1`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          const newUser = response.data.payload;
          localStorage.setItem(REACT_APP_USER, JSON.stringify(newUser));
          step1Data(newUser);
          setIsLoading(false);
          getToast(
            'Successful',
            'Your account has been created successfully',
            'success'
          );
        }
      })
      .catch((err) => {
        console.log('REG ERROR', err);
        setIsLoading(false);
        getToast('Error', err.response.data.error, 'error');
      });
  };
  return (
    <Box width={'100%'} px={['3%', '5%', '5%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Create your Roots account
      </Heading>

      <Box>
        <div className='inputContainer'>
          <Input
            type='text'
            className='input'
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
          <label htmlFor='business-name' className='label'>
            First Name, Last Name
          </label>
        </div>

        <div className='inputContainer'>
          <Input
            type='email'
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='business-name' className='label'>
            Email
          </label>
        </div>

        <div className='inputContainer'>
          <Input
            type='number'
            className='input'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor='business-name' className='label'>
            Phone
          </label>
        </div>

        <div className='inputContainer'>
          <Input
            type='password'
            className='input'
            value={password}
            onChange={(e) => setPaswword(e.target.value)}
          />
          <label htmlFor='business-name' className='label'>
            Password
          </label>
        </div>
      </Box>
      <Button
        width={'100%'}
        my={['10px', '10px', '30px']}
        // isDisabled={disable}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={(e) => handleForm(e)}
        isLoading={isLoading}
        loadingText='Please wait'
        isDisabled={disable}
      >
        Proceed
      </Button>
      <Text
        textAlign={'center'}
        _hover={{ textDecoration: 'underline' }}
        fontSize='1rem'
        mb='30px'
      >
        Have an account?
        <Link to='/'> Sign in</Link>
      </Text>
      {/* </VStack> */}
    </Box>
  );
};

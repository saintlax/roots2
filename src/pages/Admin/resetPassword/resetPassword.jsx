import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Text, VStack, Center, FormLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';

const { REACT_APP_API_URL } = process.env;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const [disableInput, setIsDisableInput] = useState(true);
  const [user, setUser] = useState({});

  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const getToast = (title, description, status) => {
    const color = status === 'success' ? 'green' : 'red';
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

  const getUserFromHash = async (payload) => {
    setIsLoading(true);
    await Axios.post(`${REACT_APP_API_URL}/users/getUserFromHash`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          setUser(response.data.payload);
          getToast('Successful', 'Valid hash confirmed', 'success');
          setIsLoading(false);
          setIsDisableInput(false);
        }
      })
      .catch((err) => {
        console.log(err);
        getToast(
          'Error',
          'Something went wrong. Hash could not be confirmed',
          'error'
        );
        setIsLoading(false);
        navigate('/');
      });
  };
  const validateHash = () => {
    if (searchParams.get('hash') !== null) {
      const payload = { hash: searchParams.get('hash') };
      getUserFromHash(payload);
    } else {
      navigate('/');
    }
  };
  useEffect(() => {
    validateHash();
  }, []);
  useEffect(() => {
    password === confirmPassword && password !== ''
      ? setIsDisable(false)
      : setIsDisable(true);
  }, [password, confirmPassword]);

  const handleReset = () => {
    const payload = { id: user.id, password, confirmPassword };
    setIsLoading(true);
    postReset(payload);
  };

  const postReset = async (payload) => {
    setIsLoading(true);
    await Axios.post(`${REACT_APP_API_URL}/users/changePassword`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          getToast(
            'Successful',
            'Your password was been updated. Proceed to login',
            'success'
          );
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Something went wrong', 'error');
        setIsLoading(false);
      });
  };
  return (
    <Center w='100%' h='100vh' bg='primary' flexDirection='column'>
      <Text as='h3' color='#fff' mb='10px'>
        Roots
      </Text>
      <VStack
        spacing='30px'
        alignItems='normal'
        bg='#fff'
        p={['10']}
        borderRadius='10px'
      >
        <Text as='h2'>Create new Password</Text>
        <Box>
          <FormLabel {...SM_SIZE} margin='10px 0'>
            New Password
          </FormLabel>

          <Input
            type='password'
            {...OUTLINE_COLOR}
            onChange={(e) => setPassword(e.target.value)}
            isDisabled={disableInput}
          />

          <FormLabel {...SM_SIZE} margin='10px 0'>
            Confirm Password
          </FormLabel>

          <Input
            type='password'
            {...OUTLINE_COLOR}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isDisabled={disableInput}
          />
        </Box>

        <Text
          textAlign={'right'}
          _hover={{ textDecoration: 'underline' }}
          fontSize='0.8rem'
        >
          <Link to='/'>Back to login </Link>
        </Text>
        <Button
          isDisabled={disable}
          isLoading={isLoading}
          loadingText='please wait...'
          {...NO_SHADOW}
          {...BTN_STYLE}
          onClick={handleReset}
        >
          Submit
        </Button>
      </VStack>
    </Center>
  );
};

export default ResetPassword;

const NO_SHADOW = { _focus: { boxShadow: 'none' } };
const BTN_STYLE = {
  _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
  bg: 'primary',
  color: '#fff',
};
const SM_SIZE = { fontSize: '.9rem' };
const OUTLINE_COLOR = {
  _focus: { outline: '1px solid #614285' },
};

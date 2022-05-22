import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Text, VStack, Center, FormLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';

const { REACT_APP_API_URL } = process.env;

const ForgotPassword = () => {
  const [loading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [disable, setIsDisable] = useState(true);
  const toast = useToast();
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
  useEffect(() => {
    email ? setIsDisable(false) : setIsDisable(true);
  }, [email]);

  const handleReset = () => {
    const payload = { email };
    setIsLoading(true);
    postReset(payload);
  };

  const postReset = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/users/forgotPassword`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          console.log('Branch Data', response.data.payload);
          getToast(
            'Successful',
            'An email has been set to ' + email,
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
        <Text as='h2'>Password Reset</Text>
        <Box>
          <FormLabel {...SM_SIZE} margin='10px 0'>
            Email Address
          </FormLabel>

          <Input
            type='email'
            {...OUTLINE_COLOR}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email address'
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

export default ForgotPassword;

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

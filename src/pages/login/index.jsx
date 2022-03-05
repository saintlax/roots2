import { Button } from '@chakra-ui/button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Flex, Text, VStack, Center, FormLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const navigate = useNavigate();

  // const validateEmail = () => {
  //   if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const handleLogin = () => {
    // if (email && password) {
    //   navigate('/dashboard');
    // }
  };

  useEffect(() => {
    email && password ? setIsDisable(false) : setIsDisable(true);
  }, [email, password]);

  return (
    <Center w='100%' h='100vh' bg='primary' flexDirection='column'>
      <Text as='h3' color='#fff' mb='10px'>
        Admin
      </Text>
      <VStack
        spacing='30px'
        alignItems='normal'
        bg='#fff'
        p={['10']}
        borderRadius='10px'
      >
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

        <Box>
          <FormLabel {...SM_SIZE} margin='10px 0'>
            Password
          </FormLabel>

          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
              {...OUTLINE_COLOR}
            />
            <InputRightElement width='4.5rem'>
              <Button
                {...NO_SHADOW}
                _hover={{ bg: 'transparent' }}
                bg='transparent'
                h='1.75rem'
                size='sm'
                onClick={() => setShow(!show)}
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Text
          textAlign={'right'}
          _hover={{ textDecoration: 'underline' }}
          fontSize='0.8rem'
        >
          <Link to='/forgot-password'>forgot password?</Link>
        </Text>
        <Button
          isDisabled={disable}
          {...NO_SHADOW}
          {...BTN_STYLE}
          onClick={handleLogin}
        >
          Login
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;

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

import { Box, Button, Heading, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

export const SignupForm = ({
  show,
  setShow,
  setPassword,
  setEmail,
  disable,
  setVerifyEmail,
}) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  return (
    <Box width={'100%'} px={['3%', '5%', '15%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Create your roots account
      </Heading>

      <Box>
        <div class='inputContainer'>
          <input type='text' class='input' placeholder='' />
          <label for='business-name' class='label'>
            Business Name
          </label>
        </div>
        <div class='inputContainer'>
          <input
            type='email'
            class='input'
            placeholder=''
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for='email' class='label'>
            Email
          </label>
        </div>
        <div class='inputContainer'>
          <input type='phone' class='input' placeholder='' step={1} />
          <label for='phone' class='label'>
            Phone
          </label>
        </div>
        <div class='inputContainer'>
          <input
            type='password'
            class='input'
            placeholder=''
            step={1}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for='password' class='label'>
            Password
          </label>
        </div>
      </Box>
      <Button
        width={'100%'}
        my={['10px', '10px', '30px']}
        isDisabled={disable}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={() => setVerifyEmail(true)}
      >
        Create my account
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

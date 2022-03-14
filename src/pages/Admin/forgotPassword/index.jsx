import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Text, VStack, Center, FormLabel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [loading] = useState(false);
  const [email, setEmail] = useState('');
  const [disable, setIsDisable] = useState(true);

  useEffect(() => {
    email ? setIsDisable(false) : setIsDisable(true);
  }, [email]);

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
          isLoading={loading}
          {...NO_SHADOW}
          {...BTN_STYLE}
        >
          Send Reset Pin
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

import { Box, Button, Heading, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useState } from 'react';

export const OTPForm = ({ onButtonClick }) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  const [otp, setOtp] = useState('');
  const [disable, setDisable] = useState(false);
  const handleOTP = (e) => {
    setOtp(e.target.value);
  };

  const verifyOTP = () => {
    const data = {
      otp,
      disable,
    };
    onButtonClick(data);
  };

  return (
    <Box width={'100%'} px={['3%', '5%', '15%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Enter OTP
      </Heading>

      <Box>
        <div className='inputContainer'>
          <input
            type='phone'
            className='input'
            placeholder=''
            step={1}
            onChange={(e) => handleOTP(e)}
          />
          <label htmlFor='phone' className='label'>
            OTP
          </label>
        </div>
      </Box>
      <Button
        width={'100%'}
        my={['10px', '10px', '30px']}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={verifyOTP}
      >
        Verify
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

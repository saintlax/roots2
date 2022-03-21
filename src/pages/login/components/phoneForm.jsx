import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const PhoneForm = ({ onButtonClick }) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  const [phone, setPhone] = useState('');
  const [disable, setDisable] = useState(false);
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const createOTP = () => {
    const data = {
      phone,
      disable,
    };
    onButtonClick(data);
  };

  return (
    <Box width={'100%'} px={['3%', '5%', '15%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Verify your phone number
      </Heading>

      <Box>
        <div className='inputContainer'>
          <input
            type='phone'
            className='input'
            placeholder=''
            step={1}
            onChange={(e) => handlePhone(e)}
          />
          <label htmlFor='phone' className='label'>
            Phone
          </label>
        </div>
      </Box>
      <Button
        width={'100%'}
        my={['10px', '10px', '30px']}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={createOTP}
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

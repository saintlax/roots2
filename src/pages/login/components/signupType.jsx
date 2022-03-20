import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { Success } from './Success';

export const SignupType = ({ asMerchant, asUser }) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  return (
    <Box width={'100%'} px={['3%', '5%', '15%']}>
      <>
        <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} my='10px'>
          Register
        </Heading>

        <Button
          width={'100%'}
          my='30px'
          // isDisabled={disable}
          {...NO_SHADOW}
          {...BTN_STYLE}
          onClick={() => asMerchant(true)}
        >
          as a Merchant
        </Button>

        <Button
          width={'100%'}
          my='30px'
          // isDisabled={disable}
          {...NO_SHADOW}
          {...BTN_STYLE}
          onClick={() => asUser(true)}
        >
          as a User
        </Button>
      </>
    </Box>
  );
};

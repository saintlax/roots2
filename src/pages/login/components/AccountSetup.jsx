import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HiUpload } from 'react-icons/hi';
import bgImage from '../assets/background.png';

export const AccountSetup = ({ setup, setSetup }) => {
  const navigate = useNavigate();
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  return (
    <Flex
      w='100%'
      h='100vh'
      // bg="primary"
      alignItems={'center'}
      direction={['column', 'column', 'row']}
    >
      <Box
        width={['100%', '100%', '50%']}
        h={['50%', '50%', '100vh']}
        backgroundImage={bgImage}
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        padding={['20px', '50px']}
      >
        <Box position={'relative'} height='100%'>
          <Box position={'absolute'} bottom='0%'>
            <Heading
              as='h3'
              color={'#fff'}
              fontSize={['22px', '24px', '36px']}
              mb='10px'
            >
              Register your store on Roots
            </Heading>
            <Text color={'#fff'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              condimentum risus, eget in at rhoncus vitae. Enim in ullamcorper
              ut pulvinar. Interdum cursus nibh quam elit nunc donec neque.{' '}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box width={['100%', '100%', '50%']} px={['3%', '5%', '8%']} pb='20px'>
        <Heading
          textAlign={['center']}
          as={'h2'}
          fontSize={'30px'}
          my={['20px', '50px']}
        >
          Account Setup
        </Heading>

        <div class='inputContainer'>
          <input
            type=''
            class='input'
            placeholder=''
            style={{ position: 'absolute', right: '-20%' }}
          />
          <label for='' class='label'>
            CAC Documents
          </label>
          <input type='file' class='file' placeholder='' />
          <Box
            style={{ position: 'absolute', right: '5%', top: '30%' }}
            zIndex={1}
          >
            <HiUpload size={20} />
          </Box>
        </div>
        <div class='inputContainer'>
          <input type='text' class='input' placeholder='' />
          <label for='' class='label'>
            Headquarters Address
          </label>
        </div>
        <div class='inputContainer'>
          <input type='number' class='input' placeholder='' step={1} />
          <label for='' class='label'>
            No of Branches
          </label>
        </div>

        <Button
          width={'100%'}
          my='30px'
          // isDisabled={disable}
          {...NO_SHADOW}
          {...BTN_STYLE}
          onClick={() => navigate('/bank-information')}
        >
          Continue
        </Button>
        <Text
          cursor={'pointer'}
          onClick={() => navigate('/dashboard')}
          textAlign={'center'}
        >
          Skip for Now
        </Text>
      </Box>
    </Flex>
  );
};

import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

export const ConfirmUserForm = ({ onButtonClick, userData }) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  return (
    <Box width={'100%'} px={['3%', '5%', '2%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Confirm your data
      </Heading>

      <Box>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.gender}
              />
              <label for='business-name' className='label'>
                Gender
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.marital_status}
              />
              <label for='business-name' className='label'>
                Marital Status
              </label>
            </div>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={3} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.first_name}
              />
              <label for='business-name' className='label'>
                First Name
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.middle_name}
              />
              <label for='business-name' className='label'>
                Middle Name
              </label>
            </div>
          </GridItem>

          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.last_name}
              />
              <label for='business-name' className='label'>
                Last Name
              </label>
            </div>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.phone_number}
              />
              <label for='business-name' className='label'>
                Phone
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.email}
              />
              <label for='business-name' className='label'>
                Email
              </label>
            </div>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.date_of_birth}
              />
              <label for='business-name' className='label'>
                Date of Birth
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.address}
              />
              <label for='business-name' className='label'>
                Address
              </label>
            </div>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={3} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.lga_of_residence}
              />
              <label for='business-name' className='label'>
                LGA
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.state_of_residence}
              />
              <label for='business-name' className='label'>
                State of Residence
              </label>
            </div>
          </GridItem>

          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                placeholder=''
                value={userData?.nationality}
              />
              <label for='business-name' className='label'>
                Nationality
              </label>
            </div>
          </GridItem>
        </SimpleGrid>

        {/* <div className='inputContainer'>
          <input
            type='password'
            className='input'
            placeholder=''
            step={1}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <label for='password' className='label'>
            Password
          </label>
        </div> */}
      </Box>
      <Button
        width={'100%'}
        my={['10px', '10px', '30px']}
        // isDisabled={disable}
        {...NO_SHADOW}
        {...BTN_STYLE}
        // onClick={() => setVerifyEmail(true)}
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

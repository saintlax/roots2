import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { CreatePasswordModal } from './CreatePasswordModal';
import { useEffect, useState } from 'react';

export const ConfirmUserForm = ({
  onButtonClick,
  userData,
  isLoading,
  handleMerchantRegisterFormLoading,
}) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  const [gender, setGender] = useState('');
  const [marital_status, setMarital_status] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [middle_name, setMiddle_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [address, setAddress] = useState('');
  const [lga_of_residence, setLga_of_residence] = useState('');
  const [state_of_residence, setState_of_residence] = useState('');
  const [nationality, setNationality] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    !nationality ||
    !state_of_residence ||
    !lga_of_residence ||
    !address ||
    !date_of_birth ||
    !email ||
    !phone_number ||
    !last_name ||
    !last_name ||
    !first_name ||
    !gender
      ? setDisabled(false)
      : setDisabled(true);
  }, [
    nationality,
    state_of_residence,
    lga_of_residence,
    address,
    date_of_birth,
    email,
    phone_number,
    last_name,
    first_name,
    gender,
  ]);

  return (
    <Box width={'100%'} px={['3%', '5%', '2%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Confirm your data
      </Heading>

      <Box>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              {/* disabled={true}
                value={userData?.gender} */}
              <input
                type='text'
                className='input'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
                Gender
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              {/* disabled={true} */}
              <input
                type='text'
                className='input'
                value={marital_status}
                onChange={(e) => setMarital_status(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
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
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
                First Name
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                value={middle_name}
                onChange={(e) => setMiddle_name(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
                Middle Name
              </label>
            </div>
          </GridItem>

          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
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
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
                Phone
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
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
                value={date_of_birth}
                onChange={(e) => setDate_of_birth(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
                Date of Birth
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
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
                value={lga_of_residence}
                onChange={(e) => setLga_of_residence(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
                LGA
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                value={state_of_residence}
                onChange={(e) => setState_of_residence(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
                State of Residence
              </label>
            </div>
          </GridItem>

          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
              <label htmlFor='business-name' className='label'>
                Nationality
              </label>
            </div>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Button
        px='30px'
        my={['10px', '10px', '30px']}
        {...NO_SHADOW}
        {...BTN_STYLE}
        isLoading={isLoading}
        loadingText='Please wait..'
        isDisabled={disabled}
      >
        <CreatePasswordModal
          onButtonClick={onButtonClick}
          isLoading={isLoading}
          handleMerchantRegisterFormLoading={handleMerchantRegisterFormLoading}
        />
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

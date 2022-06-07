import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Select,
  Flex,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { CreatePasswordModal } from './CreatePasswordModal';
import { useEffect, useState } from 'react';
import { BsBagCheck, BsPerson } from 'react-icons/bs';
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
  const [maritalStatus, setMaritalStatus] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [LGAOfResidence, setLGAOfResidence] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState('');
  const [nationality, setNationality] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({});
  const [BVN, setBVN] = useState('');

  useEffect(() => {
    !nationality ||
    !stateOfResidence ||
    !LGAOfResidence ||
    !address ||
    !dateOfBirth ||
    !email ||
    !phoneNumber ||
    !lastName ||
    !firstName ||
    !gender ||
    !BVN ||
    !maritalStatus
      ? setDisabled(true)
      : setDisabled(false);
  }, [
    nationality,
    stateOfResidence,
    LGAOfResidence,
    address,
    dateOfBirth,
    email,
    phoneNumber,
    lastName,
    firstName,
    gender,
    maritalStatus,
    BVN,
  ]);

  const createBioData = () => {
    let data = {
      nationality,
      stateOfResidence,
      LGAOfResidence,
      address,
      dateOfBirth,
      email,
      phoneNumber,
      lastName,
      firstName,
      gender,
      maritalStatus,
      BVN,
    };
    setUser(data);
  };
  const genders = ['MALE', 'FEMALE', 'BINARY', 'NON-BINARY'];
  const maritals = ['MARRIED', 'SINGLE', 'WIDOWED', 'DIVORCED'];
  return (
    <Box width={'100%'} px={['2%', '2%', '2%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Bio data
      </Heading>

      <Box>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <Flex
              justifyContent='center'
              alignItems={'center'}
              bg='#fff'
              borderRadius={'5px'}
            >
              <BsPerson size={26} />
              <Select
                size='sm'
                placeholder='Choose a gender'
                border='none'
                _focus={{ border: 'none' }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {genders.map((genderr, i) => {
                  return <option value={genderr}>{genderr}</option>;
                })}
              </Select>
            </Flex>
          </GridItem>
          <GridItem colSpan={1}>
            <Flex
              justifyContent='center'
              alignItems={'center'}
              bg='#fff'
              borderRadius={'5px'}
            >
              <BsPerson size={26} />
              <Select
                size='sm'
                placeholder='Choose a Marital Status'
                border='none'
                _focus={{ border: 'none' }}
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                {maritals.map((mar, i) => {
                  return <option value={mar}>{mar}</option>;
                })}
              </Select>
            </Flex>
          </GridItem>
        </SimpleGrid>

        <SimpleGrid columns={3} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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

        <div className='inputContainer'>
          <input
            type='text'
            className='input'
            value={BVN}
            onChange={(e) => setBVN(e.target.value)}
          />
          <label htmlFor='business-name' className='label'>
            Bank Verification Number (BVN)
          </label>
        </div>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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
                value={LGAOfResidence}
                onChange={(e) => setLGAOfResidence(e.target.value)}
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
                value={stateOfResidence}
                onChange={(e) => setStateOfResidence(e.target.value)}
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
        onClick={createBioData}
      >
        <CreatePasswordModal
          onButtonClick={onButtonClick}
          isLoading={isLoading}
          handleMerchantRegisterFormLoading={handleMerchantRegisterFormLoading}
          user={user}
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

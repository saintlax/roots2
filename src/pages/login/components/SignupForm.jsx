import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useState } from 'react';

export const SignupForm = ({ onMerchantFirstForm }) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  const [businessName, setBusinessName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [BVN, setBVN] = useState('');
  const [businessAcountNumber, setBusinessAcountNumber] = useState('');
  const [nameOfBank, setNameOfBank] = useState('');
  const [companyLogo, setCompanyLogo] = useState(null);

  const handleBusinessName = (e) => {
    setBusinessName(e.target.value);
  };

  const handleCompanyAddress = (e) => {
    setCompanyAddress(e.target.value);
  };

  const handleCompanyPhone = (e) => {
    setCompanyPhoneNumber(e.target.value);
  };

  const handleCompanyEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleBVN = (e) => {
    setBVN(e.target.value);
  };

  const handleBank = (e) => {
    setNameOfBank(e.target.value);
  };

  const handleAccountNumber = (e) => {
    setBusinessAcountNumber(e.target.value);
  };

  const handleForm = (e) => {
    const data = {
      companyAddress,
      email,
      companyPhoneNumber,
      nameOfBank,
      BVN,
      businessName,
      businessAcountNumber,
      file: companyLogo,
    };
    if (
      companyAddress === '' ||
      email === '' ||
      companyPhoneNumber === '' ||
      BVN === ''
    ) {
      alert('All fields are required');
      return;
    }
    onMerchantFirstForm(data);
  };

  const handleCompanyLogo = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  return (
    <Box width={'100%'} px={['3%', '5%', '5%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Create your Merchant
      </Heading>

      <Box>
        <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => handleBusinessName(e)}
              />
              <label htmlFor='business-name' className='label'>
                Business Name
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => handleCompanyAddress(e)}
              />
              <label htmlFor='business-address' className='label'>
                Company Address
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
                onChange={(e) => handleCompanyPhone(e)}
              />
              <label htmlFor='business-phone' className='label'>
                Company Phone
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => handleCompanyEmail(e)}
              />
              <label htmlFor='business-email' className='label'>
                Company Email
              </label>
            </div>
          </GridItem>

          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => handleBVN(e)}
              />
              <label htmlFor='business-bvn' className='label'>
                BVN
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
                onChange={(e) => handleAccountNumber(e)}
              />
              <label htmlFor='business-acct' className='label'>
                Business Account Number
              </label>
            </div>
          </GridItem>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => handleBank(e)}
              />
              <label htmlFor='business-bank' className='label'>
                Name of Bank
              </label>
            </div>
          </GridItem>
        </SimpleGrid>
        <SimpleGrid columns={1} columnGap={3} rowGap={6} w='full'>
          <GridItem colSpan={1}>
            <div className='inputContainer'>
              <input
                type='file'
                className='input'
                onChange={(e) => handleCompanyLogo(e)}
              />
              <label htmlFor='business-logo' className='label'>
                Choose company Logo
              </label>
            </div>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Button
        width={'100%'}
        my={['10px', '10px', '30px']}
        // isDisabled={disable}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={(e) => handleForm(e)}
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

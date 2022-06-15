import {
  Box,
  Heading,
  Input,
  Text,
  HStack,
  FormLabel,
  Button,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Axios from 'axios';
import { BiLock, BiPencil, BiUpload } from 'react-icons/bi';
import FormInput from '../../../components/common/FormInput';
const { REACT_APP_API_URL, REACT_APP_USER } = process.env;

export const BusinessInformation = ({ businessInformationData, user }) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  const [businessName, setBusinessName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [noOfBranches, setNoOfBranches] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisabled] = useState(true);
  const toast = useToast();
  const [CACDocument, setCACDocument] = useState('');
  const [CACDocumentPath, setCACDocumentPath] = useState('');

  const CACDocumentUpload = (e) => {
    uploadImage(e.target.files[0], 'CACDOCUMENT');
  };

  const uploadImage = (image, type) => {
    let form = new FormData();
    form.append('file', image);
    setIsLoading(true);
    Axios.post(`${REACT_APP_API_URL}/upload`, form, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        const payload = response.data.payload;
        const { path } = payload;

        setIsLoading(false);

        if (type === 'CACDOCUMENT') {
          setCACDocumentPath(path);
          // getToast(
          //   'Success',
          //   'CAC document was uploaded successfully',
          //   'success'
          // );
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        getToast('Error', 'File could not be uploaded', 'error');
      });
  };
  const getToast = (title, description, status) => {
    const color = status === 'success' ? 'blue' : 'red';
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      // variant: 'left-accent',
      position: 'top-right',
      containerStyle: {
        border: '10px solid ' + color,
        backgroundColor: color,
      },
    });
  };

  useEffect(() => {
    !companyAddress || !businessName || !CACDocument || !CACDocumentPath
      ? setDisabled(true)
      : setDisabled(false);
  }, [companyAddress, businessName, CACDocument, CACDocumentPath]);

  const handleForm = (e) => {
    if (!companyAddress || !businessName || !CACDocument) {
      getToast('Validation', 'All fields are required', 'error');
      return;
    }

    const data = {
      companyAddress,
      businessName,
      noOfBranches,
      CACDocumentPath,
      isActive: true,
      userId: user.id,
    };

    registerMerchant(data);
  };

  const registerMerchant = async (payload) => {
    setIsLoading(true);
    await Axios.post(`${REACT_APP_API_URL}/merchant`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          const newUser = response.data.payload;
          businessInformationData(newUser);
          setIsLoading(false);
          getToast(
            'Successful',
            'Business account has been created successfully',
            'success'
          );
        }
      })
      .catch((err) => {
        console.log('REG ERROR', err);
        setIsLoading(false);
        getToast('Error', err.response.data.error, 'error');
      });
  };
  return (
    <Box width={'100%'} px={['3%', '5%', '5%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Enter Business Information
      </Heading>

      <Box>
        <div className='inputContainer'>
          <Input
            type='text'
            className='input'
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <label htmlFor='business-name' className='label'>
            Business Name
          </label>
        </div>

        <Box pos='relative'>
          <FormInput
            icon={<BiUpload />}
            label='CAC Document'
            placeholder={'CAC Document Name'}
            value={CACDocument}
            onChange={(e) => setCACDocument(e.target.value)}
          />
          <HStack pos='absolute' top='-5px' bottom='0' right='50px'>
            {/* <Text fontSize={'12px'}>View</Text> */}
            <FormLabel cursor='pointer' htmlFor='CACDocumentPath'>
              <Text as='small' cursor='pointer'>
                Upload document
                <Input
                  id='CACDocumentPath'
                  display={'none'}
                  type='file'
                  onChange={CACDocumentUpload}
                />
              </Text>
            </FormLabel>
          </HStack>
        </Box>

        <div className='inputContainer'>
          <Input
            type='text'
            className='input'
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
          <label htmlFor='business-name' className='label'>
            Headquarters address
          </label>
        </div>

        <div className='inputContainer'>
          <Input
            type='number'
            className='input'
            value={noOfBranches}
            onChange={(e) => setNoOfBranches(e.target.value)}
          />
          <label htmlFor='business-name' className='label'>
            No. of branches(Optional)
          </label>
        </div>
      </Box>
      <Button
        width={'100%'}
        my={['10px', '10px', '30px']}
        // isDisabled={disable}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={(e) => handleForm(e)}
        isLoading={isLoading}
        loadingText='Please wait'
        isDisabled={disable}
      >
        Proceed
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

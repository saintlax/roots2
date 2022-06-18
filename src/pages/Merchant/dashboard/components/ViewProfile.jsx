import {
  Box,
  Img,
  Stack,
  Text,
  HStack,
  FormControl,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import profileBg from '../../../../assets/images/profile background.svg';
import profilePic from '../../../../assets/images/profile-pic.svg';
import FormInput from '../../../../components/common/FormInput';
import { BiLock, BiPencil } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';

const { REACT_APP_API_URL, REACT_APP_USER, REACT_APP_MERCHANT } = process.env;

const ViewMerchantProfile = ({ onClose, merchant }) => {
  const [companyAddress, setCompanyAddress] = useState('');
  const [businessAcountNumber, setBusinessAcountNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [nameOfBank, setNameOfBank] = useState('');
  const [CACDocument, setCACDocument] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyCover, setCompanyCover] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(profileBg);
  const [logo, setLogo] = useState(profilePic);
  const [CACDocumentPath, setCACDocumentPath] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const updateMerchant = () => {
    let payload = {
      ...merchant,
      companyAddress,
      companyPhoneNumber,
      businessAcountNumber,
      businessName,
      email,
      nameOfBank,
      CACDocument,
    };
    const {
      __v,
      _id,
      createdOn,
      updatedOn,
      isActive,
      BVN,
      CACDocumentPath,
      companyLogo,
      companyCover,
      code,
      userId,
      isDeleted,
      ...rest
    } = payload;

    let route = `${REACT_APP_API_URL}/merchant/${merchant.id}`;
    put(route, rest);
  };

  useEffect(() => {
    setCompanyAddress(merchant?.companyAddress);
    setBusinessAcountNumber(merchant?.businessAcountNumber);
    setBusinessName(merchant?.businessName);
    setEmail(merchant?.email);
    setNameOfBank(merchant?.nameOfBank);
    setCACDocument(merchant?.CACDocument);
    setCompanyPhoneNumber(merchant?.companyPhoneNumber);
    setCACDocumentPath(merchant?.CACDocumentPath);
    setLogo(merchant?.companyLogo);
    setBackgroundImage(merchant?.companyCover);
  }, [merchant]);

  const backgroundPicUpload = (e) => {
    uploadImage(e.target.files[0], 'COVER');
  };

  const CACDocumentUpload = (e) => {
    uploadImage(e.target.files[0], 'CACDOCUMENT');
  };

  const profilePicUpload = (e) => {
    uploadImage(e.target.files[0], 'LOGO');
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
        const { path, name } = payload;

        setIsLoading(false);
        if (type === 'LOGO') {
          let route = `${REACT_APP_API_URL}/merchant/updateLogo/${merchant.id}`;
          let logo = { companyLogo: path };
          put(route, logo);
        }
        if (type === 'COVER') {
          let route = `${REACT_APP_API_URL}/merchant/updateCover/${merchant.id}`;
          let cover = { companyCover: path };
          put(route, cover);
        }
        if (type === 'CACDOCUMENT') {
          setCACDocument(name);
          let route = `${REACT_APP_API_URL}/merchant/updateCACDOCUMENT/${merchant.id}`;
          let cover = { CACDocumentPath: path };
          put(route, cover);
          // setCACDocumentPath(path);
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

  const put = async (route, payload) => {
    setIsLoading(true);
    await Axios.put(route, payload)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          const update = { ...merchant, ...payload.data };
          dispatch({ type: ActionTypes.EDIT_MERCHANT, payload: update });
          getToast('Success', 'Merchant updated successfully', 'success');
          setIsLoading(false);
          //onClose();
        } else {
          getToast(
            'Unknown',
            'Server replied with: ' + response.status,
            'error'
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        getToast('Error', error?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };
  return (
    <Stack h='100%' px={[0, 2, 5]} w='100%'>
      <Box px={[null, null, '5%']} pos='relative'>
        <FormLabel cursor='pointer' htmlFor='profileBg' w='500px'>
          <Img
            src={merchant.companyCover ? merchant?.companyCover : profileBg}
            alt='background'
            w='100%'
          />
          <Input
            id='profileBg'
            display={'none'}
            type='file'
            onChange={backgroundPicUpload}
          />
        </FormLabel>

        <FormLabel htmlFor='profilePic' pos='absolute' className='profile-pic'>
          <Img
            w='100%'
            h='100%'
            cursor='pointer'
            src={companyLogo ? companyLogo : logo}
            alt='profile picture'
            borderRadius='20px'
          />
          <Input
            type='file'
            id='profilePic'
            display='none'
            onChange={profilePicUpload}
          />
        </FormLabel>
        <FormControl mt='60px'>
          <Stack
            spacing={[null, null, '5']}
            direction={['column', 'column', 'row']}
          >
            <FormInput
              icon={<BiLock />}
              label='Business Name'
              placeholder='Emeka and Sons'
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <FormInput
              icon={<BiPencil />}
              label='Email'
              placeholder='Obi@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>
          <Stack
            spacing={[null, null, '5']}
            direction={['column', 'column', 'row']}
          >
            <FormInput
              icon={<BiPencil />}
              label='Headquater Address'
              placeholder={'Headquater Address'}
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
            <FormInput
              icon={<BiPencil />}
              label='Phone Number'
              placeholder={'Phone number'}
              value={companyPhoneNumber}
              onChange={(e) => setCompanyPhoneNumber(e.target.value)}
            />
          </Stack>
          <Box pos='relative'>
            <FormInput
              icon={<BiLock />}
              label='CAC Document'
              placeholder={'CAC Document Name'}
              value={CACDocument}
              onChange={(e) => setCACDocument(e.target.value)}
              isDisabled={true}
            />
            <HStack pos='absolute' top='-5px' bottom='0' right='50px'>
              <Text fontSize={'12px'}>View</Text>
              <FormLabel cursor='pointer' htmlFor='CACDocumentPath'>
                <Text as='small'>
                  Upload
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

          <HStack mt='2' justify={['space-between', 'flex-end']}>
            <Button
              bg='primary'
              color='#fff'
              onClick={updateMerchant}
              isLoading={isLoading}
              loadingText={'Please wait..'}
            >
              Update
            </Button>
          </HStack>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default ViewMerchantProfile;

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  HStack,
} from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { addBranch } from '../../../../redux/actions/branchActions';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';

const { REACT_APP_API_URL } = process.env;

export const AddBranchModal = ({ isMobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const merchant = useSelector((state) => state.merchant);
  console.log('merchant ===>', merchant);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('');

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

  const isNameError = name === '';

  const isAddressError = name === '';

  const postBranch = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/branches`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          console.log('Branch Data', response.data.payload);
          getToast('Successful', 'New branch created', 'success');
          const branch = {
            ...payload,
            ...response.data.payload,
            // email: 'anayo@gmail.com',
            // phone: '+23470345678',
            // date: '22-01-2022',
            // amount: '0.00',
            totalOrders: '0.00',
            // description: 'Loan repayment',
            // branches: '50',
            // status: 'PENDING',
            // imageUrl: '',
            // dateCreated: '22-01-2022',
            // orderId: '#546382',
          };
          console.log('=====>', branch);
          dispatch({
            type: ActionTypes.ADD_BRANCH,
            payload: branch,
          });
          setIsLoading(false);
          setName('');
          setAddress('');
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Something went wrong', 'error');
        setIsLoading(false);
      });
  };
  const addBranch = () => {
    if (!name && !address) {
      getToast('Validation', 'Name and address are required', 'error');
      return;
    }
    setIsLoading(true);
    const payload = {
      name,
      address,
      profileImage,
      users: [],
      merchantId: merchant.id,
    };
    postBranch(payload);
  };

  const uploadImage = (image) => {
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
        setProfileImage(path);

        getToast('Success', 'Image was uploaded successfully', 'success');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        getToast('Error', 'File could not be uploaded', 'error');
      });
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiOutlinePlus color='#fff' />
        ) : (
          <>
            <AiOutlinePlus color='#fff' />
            <span style={{ marginLeft: '10px' }}>Create new</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody p='50px'>
            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <FormControl isInvalid={isNameError} isRequired>
                <FormLabel htmlFor='name' {...labelStyles}>
                  Name
                </FormLabel>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isNameError ? (
                  ''
                ) : (
                  <FormErrorMessage color='red'>
                    {' '}
                    Required field
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isAddressError} isRequired>
                <FormLabel htmlFor='name' {...labelStyles}>
                  Address
                </FormLabel>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {!isAddressError ? (
                  ''
                ) : (
                  <FormErrorMessage color='red'>
                    {' '}
                    Required field
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor='name' {...labelStyles}>
                  Branch Image
                </FormLabel>
                <Input
                  id='profileImage'
                  type='file'
                  onChange={(e) => uploadImage(e.target.files[0])}
                />
              </FormControl>
            </Flex>
            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={addBranch}
                isLoading={isLoading}
                loadingText='please wait...'
              >
                Add
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
const labelStyles = {
  fontSize: '14px',
  color: '#1E223E',
  mb: '5px',
  mt: '10px',
};

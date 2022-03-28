import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  ModalHeader,
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  HStack,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';
const { REACT_APP_API_URL } = process.env;

export const AddStaffModal = ({ branch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const merchant = useSelector((state) => state.merchant);

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const register = (event) => {
    if (!firstName && !lastName && !email) {
      getToast('Validation Error', 'All fields are required', 'error');
      return;
    }
    if (password !== confirmPassword) {
      getToast('Validation Error', 'Password Mismatch. Try Again', 'error');
      return;
    }
    if (password.length < 7) {
      getToast(
        'Validation Error',
        'Password must be more than 7 characters',
        'error'
      );
      return;
    }
    setIsLoading(true);
    const payload = {
      password,
      lastName,
      firstName,
      email,
      branchName: branch?.name,
      merchantName: merchant?.businessName,
    };
    postInviteUser(payload);
  };
  const postInviteUser = async (user) => {
    await Axios.post(`${REACT_APP_API_URL}/users/invite-user`, user)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          console.log('Invite User response', response.data.payload);
          getToast('Successful', 'An invite has been sent', 'success');
          branch.users.push(user);
          const mbranch = {
            name: branch?.name,
            address: branch?.address,
            users: branch?.users,
            status: branch?.status,
            merchantId: branch.merchantId,
            id: branch.id,
          };
          putUpdateBranch(mbranch);
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Invite user failed', 'error');
        setIsLoading(false);
      });
  };
  const putUpdateBranch = async (mbranch) => {
    console.log('branch to put', mbranch);
    await Axios.put(`${REACT_APP_API_URL}/branches/${branch.id}`, mbranch)
      .then((response) => {
        if (response.status == 200) {
          getToast('Successful', 'Branch data has been updated', 'success');
          setIsLoading(false);
          setConfirmPassword('');
          setEmail('');
          setFirstName('');
          setLastName('');
          setPassword('');
          onClose();
          dispatch({
            type: ActionTypes.EDIT_BRANCH,
            payload: { branch, ...mbranch },
          });
        }
      })
      .catch((error) => {
        console.log('Put branch error', error);
        getToast('Error', 'Branch could not be updated', 'error');
        setIsLoading(false);
      });
  };
  const isFirstNameError = password === '';
  const isLastNameError = confirmPassword === '';
  const isEmailError = email === '';

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

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <span
          alignItems='center'
          style={{
            marginLeft: '10px',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {/* {branch?.users?.length} member(s) */}
          <AiOutlineUsergroupAdd />
        </span>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Staff</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='50px'>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
              <GridItem colSpan={1}>
                <div className='inputContainer'>
                  <input
                    type='text'
                    className='input'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label htmlFor='business-fname' className='label'>
                    First Name
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

            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <FormControl isInvalid={isEmailError} isRequired>
                <FormLabel htmlFor='email' {...labelStyles}>
                  Email
                </FormLabel>
                <Input
                  id='email'
                  name='email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailError ? (
                  ''
                ) : (
                  <FormErrorMessage color='red'>
                    {' '}
                    Required field
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>

            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <FormControl isInvalid={isFirstNameError} isRequired>
                <FormLabel htmlFor='firstName' {...labelStyles}>
                  Password
                </FormLabel>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={handlePassword}
                />
                {!isFirstNameError ? (
                  ''
                ) : (
                  <FormErrorMessage color='red'>
                    {' '}
                    Required field
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isLastNameError} isRequired>
                <FormLabel htmlFor='lastName' {...labelStyles}>
                  Confirm Password
                </FormLabel>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
                {!isLastNameError ? (
                  ''
                ) : (
                  <FormErrorMessage color='red'>
                    {' '}
                    Required field
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>

            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={register}
                isLoading={isLoading}
                loadingText='Please wait..'
              >
                Register
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

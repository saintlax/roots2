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
  ModalHeader,
} from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { addBranch } from '../../../../redux/actions/branchActions';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
const { REACT_APP_API_URL } = process.env;

export const AddRolesModal = ({ isMobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

  const postRole = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/roles`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          console.log('Role Data', response.data.payload);
          getToast('Successful', 'New Role created', 'success');
          const role = {
            ...payload,
            ...response.data.payload,
          };
          console.log('=====>', role);
          dispatch({
            type: ActionTypes.ADD_ROLE,
            payload: role,
          });
          setIsLoading(false);
          setName('');
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', err?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };
  const addRole = () => {
    if (!name) {
      getToast('Validation', 'Name of role is required', 'error');
      return;
    }
    setIsLoading(true);
    const payload = {
      name,
      priviledges: [],
      merchantId: merchant.id,
    };
    postRole(payload);
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiOutlinePlus color='#fff' />
        ) : (
          <>
            <AiOutlinePlus color='#fff' />
            <span style={{ marginLeft: '10px' }}> role</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a role</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='25px'>
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
            </Flex>
            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={addRole}
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

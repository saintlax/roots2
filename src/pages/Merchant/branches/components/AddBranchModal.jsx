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

export const AddBranchModal = ({ isMobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const branches = useSelector((state) => state.branches);
  const dispatch = useDispatch();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const isNameError = name === '';

  const isAddressError = name === '';

  const addBranch = () => {
    if (!name && !address) {
      alert('Name and address are required');
      return;
    }
    dispatch({
      type: ActionTypes.ADD_BRANCH,
      payload: {
        id: branches[branches.length - 1].id + 1,
        name: name,
        email: 'anayo@gmail.com',
        address: address,
        phone: '+23470345678',
        date: '22-01-2022',
        amount: '250,000',
        totalOrders: '1,500',
        description: 'Loan repayment',
        branches: '50',
        status: 'Pending',
        imageUrl: '',
        dateCreated: '22-01-2022',
        orderId: '#546382',
      },
    });
    setName('');
    setAddress('');
    onClose();
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
            </Flex>
            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button bg='primary' px='30px' color='#fff' onClick={addBranch}>
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

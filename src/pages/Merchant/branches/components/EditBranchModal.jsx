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

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//import { addBranch } from '../../../../redux/actions/branchActions';
import { ActionTypes } from '../../../../redux/constants/action-types';

import { FiEdit } from 'react-icons/fi';

export const EditBranchModal = ({ branch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  // const branches = useSelector((state) => state.branches);
  const dispatch = useDispatch();
  const isNameError = name === '';
  const isAddressError = name === '';

  useEffect(() => {
    setName(branch?.name);
    setAddress(branch?.address);
    setIsLoading(false);
  }, [branch]);

  const editBranch = () => {
    if (!name && !address) {
      alert('Name and address are required');
      return;
    }
    dispatch({
      type: ActionTypes.EDIT_BRANCH,
      payload: { ...branch, name, address },
    });
    setName('');
    setAddress('');
    setIsLoading(true);
    onClose();
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <FiEdit />
        <span style={{ marginLeft: '10px' }}>Edit</span>
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
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={editBranch}
                isLoading={isLoading}
                loadingText='Please wait..'
              >
                Edit
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

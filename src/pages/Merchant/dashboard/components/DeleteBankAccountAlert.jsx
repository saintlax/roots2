import React from 'react';
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  AlertDialogCloseButton,
  Text,
  Tooltip,
  HStack,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
const { REACT_APP_API_URL } = process.env;

export function DeleteBankAccountAlert({ account }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const BTN = { _focus: { boxShadow: 'none' } };
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  // const [loadingText, setLoadingText] = useState('Please wait..');

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

  const deleteAccount = async () => {
    setIsLoading(true);

    await Axios.delete(`${REACT_APP_API_URL}/bankAccounts/${account.id}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          dispatch({ type: ActionTypes.DELETE_BANK_ACCOUNT, payload: account });
          getToast('Success', 'Account deleted successfully', 'success');
          setIsLoading(false);
          onClose();
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
        getToast('Delete error', error?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      <Text ml='3PX' cursor='pointer' onClick={onOpen}>
        <Tooltip label='delete account' aria-label='A tooltip'>
          <HStack>
            <Text className='red small'>
              {/* <AiOutlineDelete  /> */}
              <BsTrash cursor='pointer' onClick={onOpen} />
            </Text>
          </HStack>
        </Tooltip>
      </Text>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize={'18px'}>
            Delete {account?.accountNumber} ?
          </AlertDialogHeader>
          <Text px='20px' fontSize={'16px'} textAlign={'center'}>
            This action cannot be undone, if you choose to continue
          </Text>
          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Button
              {...BTN}
              bg='green'
              color={'#fff'}
              ref={cancelRef}
              onClick={onClose}
              width='100%'
              fontSize={'14px'}
            >
              No, Don't Delete
            </Button>

            <Button
              {...BTN}
              width='100%'
              bg='red'
              colorScheme='red'
              ml={3}
              fontSize={'14px'}
              isLoading={isLoading}
              onClick={() => deleteAccount()}
            >
              Yes, Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

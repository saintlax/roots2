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
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useState } from 'react';
import { AiOutlineCheck, AiOutlineDelete } from 'react-icons/ai';
const { REACT_APP_API_URL } = process.env;

export function DisableUserAlert({ user }) {
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

  const disableUser = async (user) => {
    setIsLoading(true);
    // setLoadingText('please wait..');

    await Axios.put(`${REACT_APP_API_URL}/users/disable/${user.id}`, {
      isActive: !user.isActive,
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          dispatch({
            type: ActionTypes.EDIT_ALL_USERS,
            payload: { ...user, isActive: !user.isActive },
          });
          setIsLoading(false);
          getToast('Success', 'User access updated successfully', 'success');
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
        getToast('Error', 'User access could not be updated', 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      {user?.isActive ? (
        <>
          <Text ml='3PX' cursor='pointer' onClick={onOpen}>
            <Tooltip label='delete transaction' aria-label='A tooltip'>
              <Text className='red small'>
                <AiOutlineDelete />
              </Text>
            </Tooltip>
          </Text>
          <span style={{ marginLeft: '10px' }} onClick={onOpen}>
            Disable
          </span>
        </>
      ) : (
        <>
          <Text ml='3PX' cursor='pointer' onClick={onOpen}>
            <Tooltip label='delete transaction' aria-label='A tooltip'>
              <Text className='red small'>
                <AiOutlineCheck />
              </Text>
            </Tooltip>
          </Text>
          <span style={{ marginLeft: '10px' }} onClick={onOpen}>
            Enable
          </span>
        </>
      )}

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
            Are you sure you want to {user?.isActive ? 'disable' : 'enable'}{' '}
            {user?.firstName} ?
          </AlertDialogHeader>
          <Text px='20px' fontSize={'16px'} textAlign={'center'}>
            {user?.isActive
              ? 'This action will prevent user from login into their account'
              : 'This action will grant access to user accoount'}
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
              No
            </Button>
            <Button
              {...BTN}
              width='100%'
              bg='red'
              colorScheme='red'
              onClick={() => disableUser(user)}
              ml={3}
              fontSize={'14px'}
              isLoading={isLoading}
            >
              Yes, Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

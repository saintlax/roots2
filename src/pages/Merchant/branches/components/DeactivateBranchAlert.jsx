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
import { AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
const { REACT_APP_API_URL } = process.env;

export function DeactivateBranchAlert({ branch }) {
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

  const updateBranch = async () => {
    setIsLoading(true);
    branch = { ...branch, isActive: !branch?.isActive };
    await Axios.put(
      `${REACT_APP_API_URL}/branches/enableOrDisable/${branch.id}`,
      { isActive: !branch?.isActive }
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          dispatch({ type: ActionTypes.EDIT_BRANCH, payload: branch });
          getToast('Success', 'Branch updated successfully', 'success');
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
        getToast('Error', 'Branch could not be updated', 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      <Text ml='3PX' cursor='pointer' onClick={onOpen}>
        <Tooltip label='delete transaction' aria-label='A tooltip'>
          <HStack>
            {branch?.isActive ? (
              <>
                <Text className='red small'>
                  <AiOutlineDelete />
                </Text>
                <span style={{ marginLeft: '10px' }} onClick={onOpen}>
                  Deactivate
                </span>
              </>
            ) : (
              <>
                <Text className='red small'>
                  <AiOutlineCheck />
                </Text>
                <span style={{ marginLeft: '10px' }} onClick={onOpen}>
                  Activate
                </span>
              </>
            )}
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
            Are you sure you want to {branch?.isActive ? 'disable' : 'enable'}{' '}
            {branch?.name} ?
          </AlertDialogHeader>
          <Text px='20px' fontSize={'16px'} textAlign={'center'}>
            {branch?.isActive
              ? 'This action will prevent staff from login '
              : 'This action will grant staff access to this branch'}
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
              Cancel
            </Button>
            <Button
              {...BTN}
              width='100%'
              bg='red'
              colorScheme='red'
              onClick={updateBranch}
              // onClick={() => deleteUserFromBranch(staff, branch)}
              ml={3}
              fontSize={'14px'}
              isLoading={isLoading}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

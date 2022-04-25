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

export function DeactivateMerchantAlert({ merchant }) {
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

  const updateMerchant = async () => {
    setIsLoading(true);
    merchant = { ...merchant, isActive: !merchant?.isActive };
    const {
      __v,
      _id,
      branches,
      createdOn,
      updatedOn,
      userId,
      BVN,
      code,
      ...rest
    } = merchant;

    await Axios.put(
      `${REACT_APP_API_URL}/merchant/enableOrDisable/${merchant.id}`,
      rest
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          dispatch({ type: ActionTypes.EDIT_ALL_MERCHANT, payload: merchant });
          getToast('Success', 'Merchant updated successfully', 'success');
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
        getToast('Error', 'Merchant could not be updated', 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      <Text ml='3PX' cursor='pointer' onClick={onOpen}>
        <Tooltip label='delete transaction' aria-label='A tooltip'>
          <HStack>
            {merchant?.isActive ? (
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
            Are you sure you want to {merchant?.isActive ? 'disable' : 'enable'}{' '}
            {merchant?.name} ?
          </AlertDialogHeader>
          <Text px='20px' fontSize={'16px'} textAlign={'center'}>
            {merchant?.isActive
              ? 'This action will prevent merchant and staff from login '
              : 'This action will grant merchant and staff access to their accounts'}
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
              onClick={updateMerchant}
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

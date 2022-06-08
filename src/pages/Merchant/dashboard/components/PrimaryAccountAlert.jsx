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
const { REACT_APP_API_URL } = process.env;

export function PrimaryAccountAlert({ account }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const BTN = { _focus: { boxShadow: 'none' } };
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const bankAccounts = useSelector((state) => state.bankAccounts.accounts);
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

  const resetAllPrimaryAccounts = () => {
    let update = bankAccounts.map((account) =>
      account.isPrimary ? { ...account, isPrimary: false } : account
    );
    return update;
  };

  const setPriimaryAccount = async () => {
    setIsLoading(true);
    const payload = { userId: account?.userId, isPrimary: true };
    await Axios.put(
      `${REACT_APP_API_URL}/bankAccounts/setPrimary/${account.id}`,
      payload
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const refreshed = resetAllPrimaryAccounts();
          dispatch({
            type: ActionTypes.REFRESH_BANK_ACCOUNT,
            payload: refreshed,
          });
          const editRow = { ...account, ...payload };
          dispatch({ type: ActionTypes.EDIT_BANK_ACCOUNT, payload: editRow });
          getToast('Success', 'Account updated successfully', 'success');
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
        getToast('Delete error', 'Staff could not be deleted', 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      <Text ml='3PX' cursor='pointer' onClick={onOpen}>
        <Tooltip label='Set as primary account?' aria-label='A tooltip'>
          <HStack>
            <Text className='red small'>Primary Account?</Text>
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
            Set as primary bank account
          </AlertDialogHeader>
          <Text px='20px' fontSize={'16px'} textAlign={'center'}>
            Do you want your withdrawals to be paid into
            {account?.accountNumber} in {account?.nameOfBank}
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
              No, Don't
            </Button>

            <Button
              {...BTN}
              width='100%'
              bg='red'
              colorScheme='red'
              ml={3}
              fontSize={'14px'}
              isLoading={isLoading}
              onClick={() => setPriimaryAccount()}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

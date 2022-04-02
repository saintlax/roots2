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
import { AiOutlineDelete } from 'react-icons/ai';
const { REACT_APP_API_URL } = process.env;

export function OrderActionAlert({
  order,
  isOpen,
  onCloseAlert,
  onActionComplete,
  selectedAction,
}) {
  const { onOpen, onClose } = useDisclosure(); //isOpen,
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

  const updateOrder = async (order) => {
    setIsLoading(true);
    let payload = {
      ...order,
      status: selectedAction,
    };
    delete payload.createdOn;
    delete payload.updatedOn;
    delete payload._id;
    delete payload.__v;
    console.log('=====>', payload);

    // setLoadingText('please wait..');

    await Axios.put(`${REACT_APP_API_URL}/loanproducts/${payload.id}`, payload)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          // const payload = response.data.payload;
          // product = { ...product, payload };
          order.status = selectedAction;
          dispatch({ type: ActionTypes.EDIT_ORDER, payload: order });
          handleClose(false);
          onActionComplete(true);
          setIsLoading(false);
          getToast('Success', 'Order updated successfully', 'success');
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
        getToast('Order error', 'Order could not be updated', 'error');
        setIsLoading(false);
      });
  };

  const handleClose = (status) => {
    onCloseAlert(status);
    onClose();
  };

  return (
    <>
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
            Are you sure you want to set this order to {selectedAction} ?
          </AlertDialogHeader>
          <Text px='20px' fontSize={'16px'} textAlign={'center'}>
            This action cannot be undone, if you choose to continue
          </Text>
          <AlertDialogCloseButton onClick={handleClose} />
          <AlertDialogFooter>
            <Button
              {...BTN}
              bg='green'
              color={'#fff'}
              ref={cancelRef}
              onClick={handleClose}
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
              onClick={() => updateOrder(order)}
              ml={3}
              fontSize={'14px'}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

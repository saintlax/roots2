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

export function DeleteProductAlert({ product }) {
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

  const deleteProduct = async (product) => {
    setIsLoading(true);
    // setLoadingText('please wait..');
    await Axios.delete(`${REACT_APP_API_URL}/products/${product.id}`, {
      id: product.id,
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          // const payload = response.data.payload;
          // product = { ...product, payload };
          dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: product });
          getToast('Success', 'Product DELETED successfully', 'success');
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
        getToast('Product error', error?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      <Text ml='3PX' cursor='pointer' onClick={onOpen}>
        <Tooltip label='delete transaction' aria-label='A tooltip'>
          <Text className='red small'>
            <AiOutlineDelete />
          </Text>
        </Tooltip>
      </Text>
      <span style={{ marginLeft: '10px' }} onClick={onOpen}>
        Delete
      </span>
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
            Are you sure you want to delete {product?.name} ?
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
              onClick={() => deleteProduct(product)}
              ml={3}
              fontSize={'14px'}
              isLoading={isLoading}
            >
              Yes, Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

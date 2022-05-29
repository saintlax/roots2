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
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';

const { REACT_APP_API_URL } = process.env;

export const PlaceOrderModal = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accountId, setAccountId] = useState('');
  const [qty, setQty] = useState('');

  const merchant = useSelector((state) => state.merchant);
  const userBranch = useSelector((state) => state.userBranch);

  console.log('merchant ===>', merchant);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);

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

  const postOrder = async (payload, user) => {
    setIsLoading(true);
    await Axios.post(`${REACT_APP_API_URL}/loanproducts`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          getToast(
            'Successful',
            'Notification has been sent to ' +
              user?.firstName +
              ' confirmation',
            'success'
          );
          dispatch({
            type: ActionTypes.ADD_ORDER,
            payload: response.data.payload,
          });
          setIsLoading(false);
          setAccountId('');
          setQty('');
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Something went wrong', 'error');
        setIsLoading(false);
      });
  };
  const addOrder = () => {
    if (!accountId || !qty) {
      getToast(
        'Validation',
        'account ID of user and quantity of products are required',
        'error'
      );
      return;
    }

    let payload = {
      // accountId,
      merchantId: merchant?.id | 0,
      branchId: userBranch?.id | 0,
      product,
      productId: product?.id | 0,
      qty,
      status: 'AWAITING CUSTOMER',
    };
    if (orders && orders.length) {
      const filter = orders.filter(
        (order) =>
          order?.product?.name === product?.name &&
          order?.user?.accountId === accountId &&
          order?.status.toUpperCase() === 'AWAITING CUSTOMER'
      );
      if (filter && filter.length > 0) {
        getToast(
          'Validation',
          'This order has been created already for this user',
          'error'
        );
      } else {
        checkAccountId(payload);
      }
    } else {
      checkAccountId(payload);
    }
  };

  const checkAccountId = async (payload) => {
    setIsLoading(true);
    await Axios.get(
      `${REACT_APP_API_URL}/users/filter/filter?accountId=${accountId}`,
      payload
    )
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          const users = response.data.payload;
          if (users && users.length > 0) {
            getToast('Verifiation', 'Account Id verified', 'success');
            if (users.length == 1) {
              const user = users[0];
              payload = { ...payload, user, userId: user.id };
              console.log('Confirmed', payload);
              postOrder(payload, user);
            } else {
              alert(users.length + ' users ' + ' found with this account ID');
            }
          } else {
            getToast(
              'Error',
              'Account Id could not be verified. Try again',
              'error'
            );
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Account Id could not be verified', 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <AiOutlinePlus />
        <span style={{ marginLeft: '10px' }}>Create Order</span>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Place order for {product?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='50px'>
            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <FormControl>
                <FormLabel htmlFor='name' {...labelStyles}>
                  Account ID of user
                </FormLabel>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='name' {...labelStyles}>
                  Quantity
                </FormLabel>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </FormControl>
            </Flex>
            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={addOrder}
                isLoading={isLoading}
                loadingText='please wait...'
              >
                Proceed
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

import { Button, HStack, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import FormInput from '../../../../components/common/FormInput';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ActionTypes } from '../../../../redux/constants/action-types';
const { REACT_APP_API_URL } = process.env;

const ChangePIN = ({ onPinChanged }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setIsDisable] = useState(true);
  const user = useSelector((state) => state.user);
  const currentPin = useSelector((state) => state.transactionPin);
  const dispatch = useDispatch();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [oldPin, setOldPin] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    pin === confirmPin && pin !== '' ? setIsDisable(false) : setIsDisable(true);
  }, [pin, confirmPin]);
  const toast = useToast();

  const handleCreate = () => {
    if (currentPin?.pin !== oldPin) {
      getToast(
        'Validation',
        'Your Old PIN does not match the existing PIN',
        'error'
      );
      return;
    }
    const payload = {
      pin,
      oldPin,
    };
    postChange(payload);
  };

  const postChange = async (payload) => {
    setIsLoading(true);
    await Axios.put(
      `${REACT_APP_API_URL}/transactionPin/changePin/${user.id}`,
      payload
    )
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          getToast(
            'Successful',
            'Your transaction PIN has been updated successfully',
            'success'
          );
          const data = response.data.payload;
          dispatch({
            type: ActionTypes.ADD_PIN,
            payload: data,
          });
          setIsLoading(false);
          // onClose();
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', err?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };
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

  return (
    <Stack minH='50vh'>
      <Text>Change PIN</Text>

      <FormInput
        type='password'
        label='Enter Current  PIN'
        onChange={(e) => setOldPin(e.target.value)}
      />

      <FormInput
        type='password'
        label='Enter New PIN'
        onChange={(e) => setPin(e.target.value)}
      />
      <FormInput
        type='password'
        label='Repeat PIN'
        onChange={(e) => setConfirmPin(e.target.value)}
      />

      <HStack justify={'right'} align='end' flex={1} spacing='3'>
        <Button variant='outline' color='darkGray' {...btnStyles}>
          Cancel
        </Button>
        <Button
          bg='primary'
          color='#fff'
          {...btnStyles}
          isDisabled={disable}
          isLoading={isLoading}
          onClick={handleCreate}
        >
          Save Changes
        </Button>
      </HStack>
    </Stack>
  );
};
export default ChangePIN;
export const btnStyles = {
  w: '120px',
  fontSize: '12px',
  size: 'sm',
};

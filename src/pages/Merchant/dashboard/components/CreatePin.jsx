import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import FormInput from '../../../../components/common/FormInput';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ActionTypes } from '../../../../redux/constants/action-types';
const { REACT_APP_API_URL } = process.env;

const CreatePIN = ({ onPinChanged }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setIsDisable] = useState(true);
  const user = useSelector((state) => state.user);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    pin === confirmPin && pin !== '' ? setIsDisable(false) : setIsDisable(true);
  }, [pin, confirmPin]);
  const toast = useToast();

  const handleCreate = () => {
    const payload = {
      pin,
      userId: user.id,
    };
    postCreate(payload);
  };

  const postCreate = async (payload) => {
    setIsLoading(true);
    await Axios.post(`${REACT_APP_API_URL}/transactionPin`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          getToast(
            'Successful',
            'Your transaction PIN has been created successfully',
            'success'
          );
          const data = response.data.payload;
          onPinChanged(data);
          setIsLoading(false);
          dispatch({
            type: ActionTypes.ADD_PIN,
            payload: data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Something went wrong', 'error');
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
      <Text>Create PIN</Text>

      <FormInput
        type='password'
        label='Enter PIN'
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
export default CreatePIN;
export const btnStyles = {
  w: '120px',
  fontSize: '12px',
  size: 'sm',
};

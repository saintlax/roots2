import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
const { REACT_APP_API_URL } = process.env;

const AdminCharge = () => {
  const [amount, setAmount] = useState('');
  const user = useSelector((state) => state.user);
  const adminCharge = useSelector((state) => state.adminCharge);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Please wait..');
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
  useEffect(() => {
    getCharges();
  }, []);
  const updateCharge = () => {
    if (!amount) {
      getToast('Error', 'Amount is required', 'error');
      return;
    }

    const payload = { amount, userId: user.id };
    if (adminCharge && Object.keys(adminCharge).length > 0) {
      const { _id, __v, createdOn, updatedOn, isDeleted, ...rest } = {
        ...adminCharge,
        ...payload,
      };
      putCharge(rest);
    } else {
      postCharge(payload);
    }
  };
  const postCharge = async (charge) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/adminCharges`, charge)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const newCharge = response.data.payload;
          const payload = { ...newCharge };
          dispatch({
            type: ActionTypes.ADD_ADMIN_CHARGE,
            payload,
          });
          getToast('Success', 'Charge created successfully', 'success');
          setIsLoading(false);
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
        getToast('Error', error?.response?.data?.error, 'error');
        // setIsLoading(false);
      });
  };

  const putCharge = async (charge) => {
    setIsLoading(true);
    setLoadingText('Updating..');
    await Axios.put(`${REACT_APP_API_URL}/adminCharges/${charge.id}`, charge)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          const { userId, amount } = payload;
          dispatch({
            type: ActionTypes.EDIT_ADMIN_CHARGE,
            payload: { ...adminCharge, userId, amount },
          });
          getToast('Success', 'Charge Updated successfully', 'success');
          setIsLoading(false);
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
        getToast('Error', error?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };

  const getCharges = async () => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.get(`${REACT_APP_API_URL}/adminCharges`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const charges = response.data.payload;
          if (charges && charges.length > 0) {
            const payload = charges[charges.length - 1];
            setAmount(payload?.amount);
            dispatch({
              type: ActionTypes.ADD_ADMIN_CHARGE,
              payload,
            });
          }
          getToast('Success', 'Charged pulled successfully', 'success');
          setIsLoading(false);
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
        getToast('Error', error?.response?.data?.error, 'error');
        // setIsLoading(false);
      });
  };

  return (
    <FormControl borderRadius='10px' p='10' bg='#fff'>
      <Text as='h3' mb='5' fontSize='16px' color='primary'>
        Set Adminstrative charge
      </Text>
      <FormLabel htmlFor='amount' {...labelStyles}>
        Amount
      </FormLabel>
      <Input
        id='amount'
        name='amount'
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />

      <HStack mt='8' justify={['space-between', 'flex-end']}>
        <Button
          bg='primary'
          px='30px'
          color='#fff'
          onClick={updateCharge}
          isLoading={isLoading}
          loadingText={loadingText}
        >
          Save
        </Button>
      </HStack>
    </FormControl>
  );
};

export default AdminCharge;

const labelStyles = {
  fontSize: '14px',
  color: '#1E223E',
  mb: '5px',
  mt: '10px',
};

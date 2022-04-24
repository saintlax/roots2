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

const Commission = () => {
  const [amount, setAmount] = useState('');
  const user = useSelector((state) => state.user);
  const adminCommission = useSelector((state) => state.adminCommission);
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
    getCommisions();
  }, []);
  const updateCommission = () => {
    if (!amount) {
      getToast('Error', 'Amount is required', 'error');
      return;
    }

    const payload = { amount, userId: user.id };
    if (adminCommission && Object.keys(adminCommission).length > 0) {
      const { _id, __v, createdOn, updatedOn, ...rest } = {
        ...adminCommission,
        ...payload,
      };
      putCommision(rest);
    } else {
      postCommision(payload);
    }
  };
  const postCommision = async (commission) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/adminCommissions`, commission)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const newCommision = response.data.payload;
          const payload = { ...newCommision };
          dispatch({
            type: ActionTypes.ADD_COMMISSION,
            payload,
          });
          getToast('Success', 'Commission created successfully', 'success');
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
        getToast('Error', 'Commision could not be created', 'error');
        // setIsLoading(false);
      });
  };

  const putCommision = async (commission) => {
    setIsLoading(true);
    setLoadingText('Updating..');
    await Axios.put(
      `${REACT_APP_API_URL}/adminCommissions/${commission.id}`,
      commission
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          const { userId, amount } = payload;
          dispatch({
            type: ActionTypes.EDIT_COMMISSION,
            payload: { ...adminCommission, userId, amount },
          });
          getToast('Success', 'Commision Updated successfully', 'success');
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
        getToast('Error', 'Commision could not be updated', 'error');
        setIsLoading(false);
      });
  };

  const getCommisions = async () => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.get(`${REACT_APP_API_URL}/adminCommissions`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const commissions = response.data.payload;
          if (commissions && commissions.length > 0) {
            const payload = commissions[commissions.length - 1];
            setAmount(payload?.amount);
            dispatch({
              type: ActionTypes.ADD_COMMISSION,
              payload,
            });
          }
          getToast('Success', 'Commission pulled successfully', 'success');
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
        getToast('Error', 'Commision could not be created', 'error');
        // setIsLoading(false);
      });
  };

  return (
    <FormControl borderRadius='10px' p='10' bg='#fff'>
      <Text as='h3' mb='5' fontSize='16px' color='primary'>
        Set Commission on transaction in percentages
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
          onClick={updateCommission}
          isLoading={isLoading}
          loadingText={loadingText}
        >
          Save
        </Button>
      </HStack>
    </FormControl>
  );
};

export default Commission;

const labelStyles = {
  fontSize: '14px',
  color: '#1E223E',
  mb: '5px',
  mt: '10px',
};

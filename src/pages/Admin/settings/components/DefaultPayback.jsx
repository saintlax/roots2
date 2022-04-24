import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';
const { REACT_APP_API_URL } = process.env;

const DefaultPayback = () => {
  const [days, setDays] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const user = useSelector((state) => state.user);
  const loanDays = useSelector((state) => state.loanDays);
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
  const updateDefaultDays = () => {
    if (!days) {
      getToast('Error', 'Number of days is required', 'error');
      return;
    }
    if (!interestRate) {
      getToast('Error', 'Interest rate is required', 'error');
      return;
    }

    const payload = { days, interestRate, userId: user.id };
    if (loanDays && Object.keys(loanDays).length > 0) {
      const { _id, __v, createdOn, updatedOn, ...rest } = {
        ...loanDays,
        ...payload,
      };
      putDays(rest);
    } else {
      postDays(payload);
    }
  };
  useEffect(() => {
    getDefaultDays();
  }, []);
  const getDefaultDays = async () => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.get(`${REACT_APP_API_URL}/adminLoanPaybackDays`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const defaultDays = response.data.payload;
          if (defaultDays && defaultDays.length > 0) {
            const payload = defaultDays[defaultDays.length - 1];
            setDays(payload?.days);
            setInterestRate(payload?.interestRate);
            dispatch({
              type: ActionTypes.ADD_LOAN_DAYS,
              payload,
            });
          }
          getToast('Success', 'Loan days pulled successfully', 'success');
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
        getToast('Error', 'Loan days not be created', 'error');
        setIsLoading(false);
      });
  };

  const postDays = async (days) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/adminLoanPaybackDays`, days)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const newDay = response.data.payload;
          const payload = { ...newDay };
          dispatch({
            type: ActionTypes.ADD_LOAN_DAYS,
            payload,
          });
          getToast('Success', 'Loan days created successfully', 'success');
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
        getToast('Error', 'Loan days could not be created', 'error');
        setIsLoading(false);
      });
  };

  const putDays = async (day) => {
    setIsLoading(true);
    setLoadingText('Updating..');
    await Axios.put(`${REACT_APP_API_URL}/adminLoanPaybackDays/${day.id}`, day)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          // const { userId, days } = payload;
          dispatch({
            type: ActionTypes.EDIT_LOAN_DAYS,
            payload: { ...loanDays, ...payload },
          });
          getToast('Success', 'Loan days Updated successfully', 'success');
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
        getToast('Error', 'Loan days could not be updated', 'error');
        setIsLoading(false);
      });
  };
  return (
    <FormControl borderRadius='10px' p='10' bg='#fff'>
      <Text as='h3' mb='5' fontSize='16px' color='primary'>
        Set the default validity period for loans in days
      </Text>
      <FormLabel htmlFor='current-password' {...labelStyles}>
        Number of days
      </FormLabel>
      <Input
        id='current-password'
        name='current-password'
        onChange={(e) => setDays(e.target.value)}
        value={days}
      />

      <FormLabel htmlFor='current-password' {...labelStyles}>
        Interest Rate eg 30 for 30%
      </FormLabel>
      <Input
        id='current-password'
        name='current-password'
        onChange={(e) => setInterestRate(e.target.value)}
        value={interestRate}
      />
      <HStack mt='8' justify={['space-between', 'flex-end']}>
        <Button
          bg='primary'
          px='30px'
          color='#fff'
          onClick={updateDefaultDays}
          isLoading={isLoading}
          loadingText={loadingText}
        >
          Save
        </Button>
      </HStack>
    </FormControl>
  );
};

export default DefaultPayback;

const labelStyles = {
  fontSize: '14px',
  color: '#1E223E',
  mb: '5px',
  mt: '10px',
};

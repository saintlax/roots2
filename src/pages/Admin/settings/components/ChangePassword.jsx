import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCureentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    password === confirmPassword && password !== '' && currentPassword !== ''
      ? setIsDisable(false)
      : setIsDisable(true);
  }, [password, confirmPassword, currentPassword]);
  const toast = useToast();
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

  const handleChange = () => {
    const payload = {
      password,
      confirmPassword,
      currentPassword,
      userId: user.id,
    };
    postChange(payload);
  };

  const postChange = async (payload) => {
    setIsLoading(true);
    await Axios.post(`${REACT_APP_API_URL}/users/changePassword`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          getToast(
            'Successful',
            'Your password was been updated successfully',
            'success'
          );
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);

        getToast('Error', err?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };
  return (
    <FormControl borderRadius='10px' p='10' bg='#fff'>
      <Text as='h3' mb='5' fontSize='16px' color='primary'>
        Change Password
      </Text>
      <FormLabel htmlFor='current-password' {...labelStyles}>
        Currrent Pasword
      </FormLabel>
      <Input
        id='current-password'
        name='current-password'
        placeholder='*******'
        type='password'
        onChange={(e) => setCureentPassword(e.target.value)}
      />
      <FormLabel htmlFor='new-password' {...labelStyles}>
        New Pasword
      </FormLabel>
      <Input
        id='new-password'
        name='new-password'
        placeholder='*******'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormLabel htmlFor='confirm-password' {...labelStyles}>
        Confirm Pasword
      </FormLabel>
      <Input
        id='confirm-password'
        name='confirm-password'
        placeholder='*******'
        type='password'
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <HStack mt='8' justify={['space-between', 'flex-end']}>
        <Button px='30px'>Cancel</Button>
        <Button
          bg='primary'
          px='30px'
          color='#fff'
          isDisabled={disable}
          isLoading={isLoading}
          onClick={handleChange}
        >
          Save
        </Button>
      </HStack>
    </FormControl>
  );
};

export default ChangePassword;

const labelStyles = {
  fontSize: '14px',
  color: '#1E223E',
  mb: '5px',
  mt: '10px',
};

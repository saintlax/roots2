import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import FormInput from '../../../../components/common/FormInput';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
const Password = () => {
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
        getToast('Error', 'Something went wrong', 'error');
        setIsLoading(false);
      });
  };
  return (
    <Stack minH='50vh'>
      <Text> Password</Text>
      <FormInput
        type='password'
        label='Enter Old Password'
        placeholder={'Password'}
        onChange={(e) => setCureentPassword(e.target.value)}
      />
      <FormInput
        type='password'
        label='Enter new Password'
        placeholder={'Password'}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormInput
        type='password'
        label='Repeat new password'
        placeholder={'Password'}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={handleChange}
        >
          Save Changes
        </Button>
      </HStack>
    </Stack>
  );
};

export default Password;

export const btnStyles = {
  w: '120px',
  fontSize: '12px',
  size: 'sm',
};

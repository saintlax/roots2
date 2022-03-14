import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const ChangePassword = () => {
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
      />
      <FormLabel htmlFor='new-password' {...labelStyles}>
        Currrent Pasword
      </FormLabel>
      <Input id='new-password' name='new-password' placeholder='*******' />
      <FormLabel htmlFor='confirm-password' {...labelStyles}>
        Currrent Pasword
      </FormLabel>
      <Input
        id='confirm-password'
        name='confirm-password'
        placeholder='*******'
      />
      <HStack mt='8' justify={['space-between', 'flex-end']}>
        <Button px='30px'>Cancel</Button>
        <Button bg='primary' px='30px' color='#fff'>
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

import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import FormInput from '../../../../components/common/FormInput';

const Password = () => {
  return (
    <Stack minH='50vh'>
      <Text> Password</Text>
      <FormInput label='Enter Old Password' placeholder={'Password'} />
      <FormInput label='Enter new Password' placeholder={'Password'} />
      <FormInput label='Repeat newPassword' placeholder={'Password'} />

      <HStack justify={'right'} align='end' flex={1} spacing='3'>
        <Button variant='outline' color='darkGray' {...btnStyles}>
          Cancel
        </Button>
        <Button bg='primary' color='#fff' {...btnStyles}>
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

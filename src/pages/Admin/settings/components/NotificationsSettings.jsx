import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const NotificationsSettings = () => {
  return (
    <FormControl borderRadius='10px' p='10' bg='#fff'>
      <Text as='h3' mb='5' fontSize='16px' color='primary'>
        Notifications
      </Text>
      <HStack justify='space-between'>
        <Stack>
          <FormLabel htmlFor='confirmtion'>Order Confirmation</FormLabel>
          <Text as='small' mt='0 !important' fontSize='13px'>
            You will be notifications when customer order any products
          </Text>
        </Stack>
        <Switch id='confirmation' defaultChecked />
      </HStack>

      <HStack justify='space-between' mt='7'>
        <Stack>
          <FormLabel htmlFor='confirmtion'>Order Delivered</FormLabel>
          <Text as='small' mt='0 !important' fontSize='13px'>
            You will be notifications once the order is delivered
          </Text>
        </Stack>
        <Switch id='confirmation' />
      </HStack>

      <HStack justify='space-between' mt='7'>
        <Stack>
          <FormLabel htmlFor='confirmtion'>Email Notificotion</FormLabel>
          <Text as='small' mt='0 !important' fontSize='13px'>
            Turm on email notification to get updates through email
          </Text>
        </Stack>
        <Switch id='confirmation' defaultChecked />
      </HStack>
    </FormControl>
  );
};

export default NotificationsSettings;

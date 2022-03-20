import { Divider, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiKey } from 'react-icons/bi';
import { FiBell } from 'react-icons/fi';
import ChangePassword from './components/ChangePassword';
import NotificationsSettings from './components/NotificationsSettings';

const Settings = () => {
  const [settingType, setSettingType] = useState('change-password');

  return (
    <Stack h='100%' overflowY='auto'>
      <Text as='h3'>Settings</Text>
      <Flex gap='7' direction={['column', 'column', 'row']}>
        <Stack borderRadius='10px' gap='2' p='10' bg='white' fontSize='15px'>
          <HStack
            cursor='pointer'
            onClick={() => setSettingType('change-password')}
            className={settingType === 'change-password' && 'active-setting'}
          >
            <BiKey size={25} />
            <Text>Change Password</Text>
          </HStack>
          <Divider />
          <HStack
            cursor='pointer'
            onClick={() => setSettingType('notifications')}
            className={settingType === 'notifications' && 'active-setting'}
          >
            <FiBell size={25} />
            <Text>Notifications</Text>
          </HStack>
        </Stack>
        {settingType === 'change-password' ? (
          <ChangePassword />
        ) : (
          <NotificationsSettings />
        )}
      </Flex>
    </Stack>
  );
};

export default Settings;

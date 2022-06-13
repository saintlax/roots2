import { Divider, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiKey } from 'react-icons/bi';
import {
  FiBell,
  FiBriefcase,
  FiAlertTriangle,
  FiActivity,
  FiCreditCard,
} from 'react-icons/fi';
import AdminCharge from './components/AdminCharge';
import ChangePassword from './components/ChangePassword';
import Commission from './components/Commission';
import DefaultPayback from './components/DefaultPayback';
import NotificationsSettings from './components/NotificationsSettings';

const Settings = () => {
  const [settingType, setSettingType] = useState('change-password');

  const ShowView = () => {
    if (settingType === 'change-password') {
      return <ChangePassword />;
    }
    if (settingType === 'commission') {
      return <Commission />;
    }
    if (settingType === 'admin-charge') {
      return <AdminCharge />;
    }
    if (settingType === 'notifications') {
      return <NotificationsSettings />;
    }
    if (settingType === 'default_payback') {
      return <DefaultPayback />;
    }
  };

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
          <Divider />
          <HStack
            cursor='pointer'
            onClick={() => setSettingType('commission')}
            className={settingType === 'commission' && 'active-setting'}
          >
            <FiBriefcase size={25} />
            <Text>Commission</Text>
          </HStack>
          <Divider />
          <HStack
            cursor='pointer'
            onClick={() => setSettingType('default_payback')}
            className={settingType === 'default_payback' && 'active-setting'}
          >
            <FiActivity size={25} />
            <Text>Interest Rate</Text>
          </HStack>
          <HStack
            cursor='pointer'
            onClick={() => setSettingType('admin-charge')}
            className={settingType === 'admin-charge' && 'active-setting'}
          >
            <FiCreditCard size={25} />
            <Text>Administrative Charge</Text>
          </HStack>
        </Stack>
        <ShowView />
      </Flex>
    </Stack>
  );
};

export default Settings;

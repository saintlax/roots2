import { HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import CustomModal from '../../../../components/common/CustomModal';
import BankSettings from './BankSettings';
import Password from './Password';

const Settings = () => {
  return (
    <Stack minH='50vh' spacing='5'>
      <CustomModal
        btnTitle={'Bank Settings'}
        buttonProps={{ ...btnProps }}
        title={<TitleWithPreTitile title='Bank Settings' />}
      >
        <BankSettings />
      </CustomModal>

      <CustomModal
        btnTitle={'Password'}
        buttonProps={{ ...btnProps }}
        title={<TitleWithPreTitile title='Password' />}
      >
        <Password />
      </CustomModal>
    </Stack>
  );
};

export default Settings;

export const btnProps = {
  rightIcon: <BsArrowRight />,
  justifyContent: 'space-between',
  pl: '10px',
  fontWeight: 400,
  color: '#333',
  variant: 'outline',
  border: ' 1px solid #eee',
  _hover: { background: '#fafafa' },
};

export const TitleWithPreTitile = ({ title }) => {
  return (
    <HStack color='lightGray' fontWeight={500}>
      <Text>Settings </Text>
      <BsArrowRight />
      <Text color='darkGray'>{title}</Text>
    </HStack>
  );
};

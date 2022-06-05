import { HStack, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import CustomModal from '../../../../components/common/CustomModal';
import BankSettings from './BankSettings';
import Password from './Password';
import TransactionPin from './TransactionPin';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { ActionTypes } from '../../../../redux/constants/action-types';
const { REACT_APP_API_URL } = process.env;
const Settings = () => {
  const user = useSelector((state) => state.user);
  const [currentPin, setCurrentPin] = useState({ id: -1 });
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentPin();
  }, []);

  const getCurrentPin = async () => {
    await Axios.get(
      `${REACT_APP_API_URL}/transactionPin/filter/filter?userId=${user.id}`
    )
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          const payload = response.data.payload;
          if (payload && payload.length > 0) {
            const data = payload[payload.length - 1];
            dispatch({
              type: ActionTypes.ADD_PIN,
              payload: data,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPinChanged = (data) => {
    setCurrentPin(data);
  };

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

      <CustomModal
        btnTitle={'Transaction PIN'}
        buttonProps={{ ...btnProps }}
        title={<TitleWithPreTitile title='PIN' />}
      >
        <TransactionPin currentPin={currentPin} onPinChanged={onPinChanged} />
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

import React from 'react';
import CreatePIN from './CreatePin';
import ChangePIN from './ChangePin';
import { useSelector } from 'react-redux';

const TransactionPin = ({ onPinChanged }) => {
  const currentPin = useSelector((state) => state.transactionPin);
  const Show = () => {
    if (currentPin && Object.keys(currentPin).length > 0)
      return <ChangePIN onPinChanged={onPinChanged} />;
    else return <CreatePIN onPinChanged={onPinChanged} />;
  };

  return <Show />;
};

export default TransactionPin;

export const btnStyles = {
  w: '120px',
  fontSize: '12px',
  size: 'sm',
};

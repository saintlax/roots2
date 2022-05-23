import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Button,
  HStack,
  ModalHeader,
} from '@chakra-ui/react';

import { AiFillEdit } from 'react-icons/ai';
import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import IsMobile from '../../../../components/common/IsMobile';
import { useSelector } from 'react-redux';
const { REACT_APP_API_URL } = process.env;

export const EditStaffBankModal = ({
  staff,
  bankAccount,
  onBankAccountUpdate,
}) => {
  useEffect(() => {
    setNameOfBank(bankAccount?.nameOfBank);
    setAccountName(bankAccount?.accountName);
    setAccountNumber(bankAccount?.accountNumber);
    setBankCode(bankAccount?.bankCode);
    setIsLoading(false);
  }, [bankAccount]);

  const isMobile = IsMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameOfBank, setNameOfBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const user = useSelector((state) => state.user);

  // const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Please wait..');

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

  const handleUpdate = () => {
    if (!nameOfBank || !accountNumber || !accountName || !bankCode) {
      getToast('Validation Error', 'All fields are required fields', 'error');
      return;
    }

    const payload = {
      ...bankAccount,
      nameOfBank,
      accountName,
      accountNumber,
      bankCode,
      userId: user?.id,
    };

    const { __v, _id, createdOn, updatedOn, isActive, id, ...rest } = payload;
    putStaff(rest, payload);
  };

  // const clearFields = () => {
  //   setNameOfBank('');
  //   setAccountName('');
  //   setAccountNumber('');
  // };
  const putStaff = async (payload, original) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/bankAccounts`, payload)
      .then((response) => {
        if (response.status == 200) {
          const data = response.data.payload;
          console.log(data);
          onBankAccountUpdate(data);
          // dispatch({ type: ActionTypes.EDIT_MERCHANT, payload: original });

          getToast('Success', 'Bank Account updated successfully', 'success');
          setIsLoading(false);
          onClose();
        } else {
          getToast(
            'Unknown',
            'Server replied with: ' + response.status,
            'error'
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        getToast('Error', 'Bank details could not be updated', 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiFillEdit color='#fff' />
        ) : (
          <>
            <AiFillEdit color='#fff' />
            <span style={{ marginLeft: '10px' }}>Edit</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='20px'>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => setNameOfBank(e.target.value)}
                value={nameOfBank}
              />
              <label htmlFor='name' className='label'>
                Name of Bank
              </label>
            </div>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => setAccountNumber(e.target.value)}
                value={accountNumber}
              />
              <label htmlFor='name' className='label'>
                Account Number
              </label>
            </div>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => setAccountName(e.target.value)}
                value={accountName}
              />
              <label htmlFor='name' className='label'>
                Account Name
              </label>
            </div>

            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => setBankCode(e.target.value)}
                value={bankCode}
              />
              <label htmlFor='name' className='label'>
                Bank Code
              </label>
            </div>

            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={handleUpdate}
                isLoading={isLoading}
                loadingText={loadingText}
              >
                Update
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
const labelStyles = {
  fontSize: '14px',
  color: '#1E223E',
  mb: '5px',
  mt: '10px',
};

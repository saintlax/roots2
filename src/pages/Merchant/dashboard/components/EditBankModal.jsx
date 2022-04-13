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

import { AiOutlinePlus, AiFillEdit } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import IsMobile from '../../../../components/common/IsMobile';
const { REACT_APP_API_URL } = process.env;

export const EditBankModal = ({ merchant }) => {
  useEffect(() => {
    setNameOfBank(merchant?.nameOfBank);
    setBankAcountName(merchant?.bankAcountName);
    setBusinessAcountNumber(merchant?.businessAcountNumber);
    setIsLoading(false);
  }, [merchant]);

  const isMobile = IsMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameOfBank, setNameOfBank] = useState('');
  const [businessAcountNumber, setBusinessAcountNumber] = useState('');
  const [bankAcountName, setBankAcountName] = useState('');
  const dispatch = useDispatch();
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
    if (!nameOfBank || !businessAcountNumber || !bankAcountName) {
      getToast('Validation Error', 'All fields are required fields', 'error');
      return;
    }

    const payload = {
      ...merchant,
      nameOfBank,
      bankAcountName,
      businessAcountNumber,
    };

    const {
      __v,
      _id,
      createdOn,
      updatedOn,
      isActive,
      userId,
      code,
      BVN,
      ...rest
    } = payload;
    putMerchant(rest, payload);
  };

  const clearFields = () => {
    setNameOfBank('');
    setBankAcountName('');
    setBusinessAcountNumber('');
  };
  const putMerchant = async (payload, original) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.put(`${REACT_APP_API_URL}/merchant/${merchant.id}`, payload)
      .then((response) => {
        if (response.status == 200) {
          const data = response.data.payload;
          console.log(data);

          dispatch({ type: ActionTypes.EDIT_MERCHANT, payload: original });

          getToast(
            'Success',
            'Account details updated successfully',
            'success'
          );
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
                onChange={(e) => setBusinessAcountNumber(e.target.value)}
                value={businessAcountNumber}
              />
              <label htmlFor='name' className='label'>
                Account Number
              </label>
            </div>
            <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => setBankAcountName(e.target.value)}
                value={bankAcountName}
              />
              <label htmlFor='name' className='label'>
                Account Name
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

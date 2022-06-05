import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  SimpleGrid,
  GridItem,
  Button,
  HStack,
  ModalHeader,
  Textarea,
} from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { VerifyPINModal } from './VerifyPINModal';
const { REACT_APP_API_URL } = process.env;

export const AddWithdrawalModal = ({ isMobile, wallet, onWalletChange }) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Please wait..');
  const [disable, setIsDisable] = useState(true);

  useEffect(() => {
    amount && !isNaN(amount) ? setIsDisable(false) : setIsDisable(true);
  }, [amount]);
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

  const sendRequest = () => {
    if (!amount) {
      getToast('Validation Error', 'Amount is required', 'error');
      return;
    }
    if (isNaN(amount)) {
      getToast('Error', 'Amount must be a number', 'error');
      return;
    }
    if (wallet.amount - parseInt(amount) < 0) {
      getToast(
        'Insufficient balance',
        'You do not have enough funds in your wallet for this transaction',
        'error'
      );
      return;
    }

    const withdrawal = {
      amount,
      userId: user.id + '',
      status: 'PENDING',
      description,
      accountNumber: merchant?.businessAcountNumber,
      nameOfBank: merchant?.nameOfBank,
    };
    postWithdrawal(withdrawal);
  };

  const clearFields = () => {
    setAmount('');
    setDescription('');
  };
  const postWithdrawal = async (withdrawal) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/withdrawals`, withdrawal)
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          wallet = { ...wallet, amount: payload?.amount };
          onWalletChange(wallet);
          getToast('Success', 'Withdrawal created successfully', 'success');
          setIsLoading(false);
          clearFields();
          dispatch({ type: ActionTypes.ADD_WITHDRAWAL, payload });
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
        console.log('ERROR', error);
        getToast('Error', 'Withdrawal could not be completed', 'error');
        setIsLoading(false);
      });
  };

  const onVerify = (data) => {
    if (data) {
      sendRequest();
    }
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiOutlinePlus color='#fff' />
        ) : (
          <>
            <AiOutlinePlus color='#fff' />
            <span style={{ marginLeft: '10px' }}>Request withdrawal</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request withdrawal from wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='50px'>
            <SimpleGrid columns={1} columnGap={3} rowGap={6} w='full'>
              <GridItem colSpan={1}>
                <div className='inputContainer'>
                  <input
                    type='text'
                    className='input'
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                  <label htmlFor='name' className='label'>
                    Amount
                  </label>
                </div>
              </GridItem>
            </SimpleGrid>

            <div className='inputContainer'>
              <Textarea
                type='text'
                className='input'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                size='sm'
              />
              <label htmlFor='name' className='label'>
                Description
              </label>
            </div>
            <br />
            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                isLoading={isLoading}
                loadingText={loadingText}
                isDisabled={disable}
              >
                {/* onClick={sendRequest} */}
                {/* Submit */}
                <VerifyPINModal isLoading={isLoading} onVerify={onVerify} />
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

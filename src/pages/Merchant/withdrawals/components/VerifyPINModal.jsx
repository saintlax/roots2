import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  ModalHeader,
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Axios from 'axios';
import { useSelector } from 'react-redux';
const { REACT_APP_API_URL } = process.env;

export const VerifyPINModal = ({ onVerify }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const user = useSelector((state) => state.user);

  const handlePin = (event) => {
    setPin(event.target.value);
  };

  const checkPin = (event) => {
    if (!pin) {
      getToast('Validation Error', 'pin must not be empty', 'error');
      return;
    }
    const data = {
      pin,
      userId: user.id,
    };

    postCheckPin(data);
  };

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

  const postCheckPin = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/transactionPin/checkPin`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          const payload = response.data.payload;
          if (payload && payload.id) {
            getToast('Valid PIN', 'PIN confirmed', 'success');
            setPin('');
            onVerify(true);
            onClose();
          } else {
            getToast('PIN ERROR', 'PIN does not match', 'error');
          }
        }
      })
      .catch((err) => {
        getToast('PIN ERROR', err?.response?.data?.error, 'error');
        console.log(err);
      });
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <span alignItems='center' style={{ marginLeft: '10px' }}>
          Continue
        </span>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction PIN</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='50px'>
            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <FormControl>
                <FormLabel htmlFor='firstName' {...labelStyles}>
                  Pin
                </FormLabel>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={pin}
                  onChange={handlePin}
                />
              </FormControl>
            </Flex>

            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={checkPin}
                isLoading={isLoading}
                loadingText='Please wait..'
              >
                Proceed
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

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
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';

export const CreatePasswordModal = ({
  onButtonClick,
  isLoading,
  handleMerchantRegisterFormLoading,
  user,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    !password || password !== confirmPassword
      ? setDisabled(true)
      : setDisabled(false);
  }, [password, confirmPassword]);
  const toast = useToast();

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const register = (event) => {
    if (password !== confirmPassword) {
      getToast('Validation Error', 'Password Mismatch. Try Again', 'error');
      return;
    }
    if (password.length < 7) {
      getToast(
        'Validation Error',
        'Password must be more than 7 characters',
        'error'
      );
      return;
    }
    const data = {
      password,
      confirmPassword,
      ...user,
    };
    setPassword('');
    setConfirmPassword('');
    onClose();
    handleMerchantRegisterFormLoading(true);
    onButtonClick(data);
  };
  const isFirstNameError = password === '';
  const isLastNameError = confirmPassword === '';

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

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <span alignItems='center' style={{ marginLeft: '10px' }}>
          Register
        </span>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='50px'>
            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <FormControl isInvalid={isFirstNameError} isRequired>
                <FormLabel htmlFor='firstName' {...labelStyles}>
                  Password
                </FormLabel>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={handlePassword}
                />
                {!isFirstNameError ? (
                  ''
                ) : (
                  <FormErrorMessage color='red'>
                    {' '}
                    Required field
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isLastNameError} isRequired>
                <FormLabel htmlFor='lastName' {...labelStyles}>
                  Confirm Password
                </FormLabel>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
                {!isLastNameError ? (
                  ''
                ) : (
                  <FormErrorMessage color='red'>
                    {' '}
                    Required field
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>

            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={register}
                isLoading={isLoading}
                isDisabled={disabled}
                loadingText='Please wait..'
              >
                Register
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

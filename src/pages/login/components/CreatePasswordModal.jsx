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

export const CreatePasswordModal = ({ onButtonClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const register = (event) => {
    if (password !== confirmPassword) {
      alert('Password Mismatch. Try Again');
      return;
    }
    const data = {
      password: password,
      confirmPassword: confirmPassword,
    };
    setPassword('');
    setConfirmPassword('');
    onClose();
    onButtonClick(data);
  };
  const isFirstNameError = password === '';
  const isLastNameError = confirmPassword === '';

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
                  placeholder='Password'
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
                  placeholder='Confirm Password'
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
              <Button bg='primary' px='30px' color='#fff' onClick={register}>
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

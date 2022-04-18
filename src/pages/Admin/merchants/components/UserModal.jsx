import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Flex,
  Avatar,
  Image,
} from '@chakra-ui/react';
import { BsEye } from 'react-icons/bs';

import topImage from '../images/background.png';
import { MerchantTab } from './MerchantTab';

export const UserModal = ({ merchant }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <BsEye />
        <span style={{ marginLeft: '10px' }}>View</span>
      </Flex>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size='2xl'
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton bg={'#1459df'} color='#fff' />
          <Image src={topImage} alt='Background' />
          <ModalBody>
            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
              mt='-8%'
            >
              <Avatar
                size='xl'
                name='Dan Abrahmov'
                src='https://bit.ly/dan-abramov'
              />
              <Text mt='5px'>Merchant</Text>
              <Text fontWeight={'bold'}>{merchant?.businessName}</Text>
              <Text>Account created {merchant?.createdOn}</Text>
            </Flex>
            <Flex
              width={'100%'}
              direction='column'
              my={'20px'}
              justifyContent={'space-between'}
              alignItems='center'
              fontWeight={'semibold'}
              borderBottom='5px solid #f4f4f4'
            >
              <MerchantTab merchant={merchant} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

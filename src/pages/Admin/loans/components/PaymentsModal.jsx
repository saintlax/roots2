import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Box,
  Flex,
  Avatar,
  Table,
} from '@chakra-ui/react';
import { BsEye } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { paymentTableHeadData } from './tableHeadData';
import { PaymentsTableBody } from './paymentsTableBody';
import { FiCreditCard } from 'react-icons/fi';
import { TableHead } from './TableHead';

export const PaymentModal = ({ name, loan }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <FiCreditCard />
        <span style={{ marginLeft: '10px' }}>Payments</span>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody p='50px'>
            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <Avatar size='lg' name={name} src={loan?.imageUrl} />
              <Text my='5px' fontWeight={'bold'}>
                {name}
              </Text>
              <Text
                color={
                  loan?.status === 'Accepted'
                    ? '#009A49'
                    : loan?.status === 'Rejected'
                    ? '#FF1A1A'
                    : 'yellow'
                }
              >
                {loan?.status}
              </Text>
            </Flex>
            <Box borderBottom='5px solid #f4f4f4' fontWeight={'semibold'}>
              <Box my={'10px'}>
                <Text>Payments Details</Text>
              </Box>
            </Box>
            <Box
              bg={'#fff'}
              borderRadius='20px'
              Box
              maxWidth={['100%']}
              overflowX={['scroll', 'scroll', 'scroll', 'hidden']}
            >
              <Table size='md' variant='striped' colorScheme={'blackAlpha'}>
                <TableHead tableHeadData={paymentTableHeadData} />
                <PaymentsTableBody loan={loan} />
              </Table>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
  Flex,
  Avatar,
  Select,
  Circle,
} from '@chakra-ui/react';
import {
  BsArrowDownRight,
  BsArrowUpRight,
  BsBagCheck,
  BsEye,
} from 'react-icons/bs';
import { UserTabs } from './UserTabs';
import { formatDate } from '../../../../constants/constants';
import Axios from 'axios';
import { ActionTypes } from '../../../../redux/constants/action-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;

export const UserModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <BsEye />
        <span style={{ marginLeft: '10px' }}>View</span>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody p='15px'>
            <Flex
              width={'100%'}
              direction='column'
              justifyContent='center'
              alignItems={'center'}
            >
              <Avatar
                size='lg'
                name={data?.firstName + ' ' + data?.lastName}
                src={data?.imageUrl}
              />
              <Text my='5px' fontWeight={'bold'}>
                {data?.firstName + ' ' + data?.lastName}
              </Text>
              <Text>Account created {formatDate(data?.createdOn)}</Text>
            </Flex>
            <UserTabs data={data} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

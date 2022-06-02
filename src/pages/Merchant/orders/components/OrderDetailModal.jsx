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
import { BsBagCheck, BsEye, BsBriefcase } from 'react-icons/bs';
import { useToast } from '@chakra-ui/toast';
import { OrderActionAlert } from './OrderActionAlert';
import { useState } from 'react';
import { formatCurrency, formatDate } from '../../../../constants/constants';

export const OrderDetailModal = ({ order }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [takeAction, setTakeAction] = useState(false);
  const [selectedAction, setSelectedAction] = useState(false);
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
  const handleSelection = (e) => {
    const action = e.target.value;
    if (action) {
      if (order.status === 'Completed' || order.status === 'Approved') {
        getToast(
          'No action Required',
          `This order has been marked as ${order.status} already`,
          'error'
        );
        return;
      }
      setSelectedAction(action);
      setTakeAction(true);
      return;
    } else {
      getToast('No action', 'No action was taken on this order', 'error');
      return;
    }
  };

  const onCloseAlert = (status) => {
    setTakeAction(false);
  };

  const onActionComplete = (status) => {
    onClose();
  };
  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <BsEye />
        <span style={{ marginLeft: '10px' }}>View Order</span>
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
              <Avatar
                size='lg'
                name='Dan Abrahmov'
                src='https://bit.ly/dan-abramov'
              />
              <Text my='5px' fontWeight={'bold'}>
                {order?.user?.firstName} {order?.user?.lastName}
              </Text>
              <Text>
                Ordered on {order.createdOn ? formatDate(order?.createdOn) : ''}
              </Text>
            </Flex>
            <Flex
              my={'20px'}
              justifyContent={'space-between'}
              alignItems='center'
              fontWeight={'semibold'}
              borderBottom='5px solid #f4f4f4'
            >
              <Text>Product Detail</Text>
              {order?.status !== 'AWAITING CUSTOMER' &&
              order?.status.toUpperCase() !== 'COMPLETED' ? (
                <Flex
                  width={'160px'}
                  justifyContent='center'
                  alignItems={'center'}
                  bg='#fff'
                  px='8px'
                  borderRadius={'5px'}
                >
                  <BsBagCheck size={26} />
                  <Select
                    placeholder='Action'
                    border='none'
                    _focus={{ border: 'none' }}
                    onChange={(e) => handleSelection(e)}
                  >
                    <option value='Approved'>Approve</option>
                    <option value='Declined'>Decline</option>
                  </Select>
                </Flex>
              ) : (
                <></>
              )}
            </Flex>
            <Flex
              my={'20px'}
              justifyContent={'space-between'}
              alignItems='center'
              fontWeight={'normal'}
            >
              <Flex
                width={'65%'}
                justifyContent={'space-between'}
                alignItems='center'
              >
                <Circle size={'30px'} bg='#1459DF'>
                  <BsBriefcase color='#fff' />
                </Circle>
                <Box>
                  <Text>Product: {order?.product?.name}</Text>
                  <Text>{order?.product?.status}</Text>
                </Box>
              </Flex>
              <Text color={'red'}>
                {order?.product.price
                  ? formatCurrency(order?.product?.price)
                  : '0.00'}
              </Text>
            </Flex>
            <Flex
              my={'20px'}
              justifyContent={'space-between'}
              alignItems='center'
              fontWeight={'normal'}
            >
              <Flex
                width={'65%'}
                justifyContent={'space-between'}
                alignItems='center'
              >
                {/* <Circle size={'30px'} bg='#1459DF'>
                  <BsArrowUpRight color='#fff' />
                </Circle> */}
                <Box>
                  <Text>Branch: {order?.product?.branch?.name}</Text>
                  <Text>Address: {order?.product?.branch?.address}</Text>
                </Box>
              </Flex>
              <Text color={'green'}>.</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <OrderActionAlert
        order={order}
        isOpen={takeAction}
        onCloseAlert={onCloseAlert}
        onActionComplete={onActionComplete}
        selectedAction={selectedAction}
      />
    </>
  );
};

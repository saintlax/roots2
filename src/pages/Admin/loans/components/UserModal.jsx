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
} from '@chakra-ui/react';
import { BsEye } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { FiEdit } from 'react-icons/fi';
import { formatCurrency, formatDate } from '../../../../constants/constants';

const { REACT_APP_API_URL } = process.env;

export const UserModal = ({ name, loan }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const updateLoan = (status) => {
    loan = { ...loan, status };
    const {
      __v,
      _id,
      createdOn,
      updatedOn,
      approvals,
      payments,
      postedBy,
      ...payload
    } = loan;
    putLoan(payload);
  };

  const putLoan = async (payload) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.put(`${REACT_APP_API_URL}/loans/${payload.id}`, payload)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          //const payload = response.data.payload;
          //loan = { ...product, payload };
          dispatch({ type: ActionTypes.EDIT_ADMIN_LOAN, payload: loan });
          getToast('Success', 'Product updated successfully', 'success');
          setIsLoading(false);
          // clearFields();
          onClose();
          //console.log('REDUX PRODUCTS', products);
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
        getToast('Product error', 'Product could not be updated', 'error');
        setIsLoading(false);
      });
  };

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
              {loan?.status !== 'COMPLETED' && (
                <Flex
                  my={'20px'}
                  width='100%'
                  justifyContent={'space-between'}
                  alignItems='center'
                >
                  <Box width={['50%']}>
                    <Button
                      variant={'outline'}
                      width={['100%']}
                      borderColor='#4A4C4F'
                      color={'darkgreen'}
                      onClick={() => updateLoan('REJECTED')}
                    >
                      Reject Loan
                    </Button>
                  </Box>

                  <Flex
                    width={['50%']}
                    justifyContent='center'
                    alignItems={'center'}
                    bg='#fff'
                    px='8px'
                    borderRadius={'5px'}
                  >
                    <Button
                      bg='#1459DF'
                      _hover={{ bg: '#1459DF' }}
                      color={'#FFF'}
                      width={['100%']}
                      onClick={() => updateLoan('COMPLETED')}
                    >
                      Close Loan
                    </Button>
                  </Flex>
                </Flex>
              )}
              <Box my={'10px'}>
                <Text>Loan Details</Text>
              </Box>
            </Box>
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
                <Box>
                  <Text>Loan Amount</Text>
                </Box>
              </Flex>
              <Text>{formatCurrency(loan?.amount)}</Text>
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
                <Box>
                  <Text>Payback date</Text>
                </Box>
              </Flex>
              <Text>{formatDate(loan?.paybackDate)}</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

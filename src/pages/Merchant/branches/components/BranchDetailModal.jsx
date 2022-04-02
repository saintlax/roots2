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
  Select,
  Circle,
} from '@chakra-ui/react';
import {
  BsArrowDownRight,
  BsArrowUpRight,
  BsBagCheck,
  BsEye,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';

export const BranchDetailModal = ({ branch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loans = useSelector((state) => state.loans.loans);

  const ShowLoans = () => {
    return loans.map((loan, i) => {
      return (
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
              {loan.status === 'Completed' ? (
                <BsArrowDownRight color='#fff' />
              ) : (
                <BsArrowUpRight color='#fff' />
              )}
            </Circle>
            <Box>
              <Text>{loan.status}</Text>
              <Text>{loan.date}</Text>
            </Box>
          </Flex>
          <Text color={loan.status === 'Completed' ? 'green' : 'red'}>
            #{loan.amount}
          </Text>
        </Flex>
      );
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
              <Text my='5px' fontWeight={'bold'}>
                {branch?.name}
              </Text>
              <Text>Address {branch?.address}</Text>
            </Flex>
            <Flex
              my={'20px'}
              justifyContent={'space-between'}
              alignItems='center'
              fontWeight={'semibold'}
              borderBottom='5px solid #f4f4f4'
            >
              <Text>Transaction History</Text>
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
                  placeholder='Last 7 days'
                  border='none'
                  _focus={{ border: 'none' }}
                >
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              </Flex>
            </Flex>
            <ShowLoans />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

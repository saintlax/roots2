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

export const UserModal = ({ name, dateCreated, branch }) => {
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
                  <BsArrowDownRight color='#fff' />
                </Circle>
                <Box>
                  <Text>Loan Paid</Text>
                  <Text>September 24, 2021 10:28pm</Text>
                </Box>
              </Flex>
              <Text color={'red'}>-#10,000</Text>
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
                  <BsArrowUpRight color='#fff' />
                </Circle>
                <Box>
                  <Text>Loan Credited</Text>
                  <Text>September 24, 2021 10:28pm</Text>
                </Box>
              </Flex>
              <Text color={'green'}>#43,000</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

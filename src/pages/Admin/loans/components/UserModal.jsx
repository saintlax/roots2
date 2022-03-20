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

export const UserModal = ({ name, data }) => {
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
              <Avatar size='lg' name={data?.name} src={data?.imageUrl} />
              <Text my='5px' fontWeight={'bold'}>
                {name}
              </Text>
              <Text
                color={
                  data?.status === 'Accepted'
                    ? '#009A49'
                    : data?.status === 'Rejected'
                    ? '#FF1A1A'
                    : 'yellow'
                }
              >
                {data?.status}
              </Text>
            </Flex>
            <Box borderBottom='5px solid #f4f4f4' fontWeight={'semibold'}>
              {data?.status === 'Pending' && (
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
                    >
                      Accept Loan
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
              <Text>#10,000</Text>
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
              <Text>24-11-2021</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

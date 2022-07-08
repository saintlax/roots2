import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  ModalHeader,
  Box,
  Table,
} from '@chakra-ui/react';

import { AiOutlineTeam } from 'react-icons/ai';
import { BranchStaffTableHead } from './branchStaffTableHead';
import { BranchStaffTableBody } from './BranchStaffTableBody';

export const ViewStaffModal = ({ branch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <span
          alignItems='center'
          style={{
            marginLeft: '10px',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          <AiOutlineTeam />
        </span>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='900px'>
          <ModalHeader>Staff of {branch?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='10px'>
            <Box
              bg={'#fff'}
              borderRadius='10px'
              border={'1px solid #E5E5E5'}
              maxW={['100%', '100%']}
              overflowX={'auto'}
            >
              <Table variant='striped' colorScheme={'blackAlpha'}>
                <BranchStaffTableHead />
                <BranchStaffTableBody branch={branch} />
              </Table>
            </Box>
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

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai';

export const AddProductModal = ({ isMobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiOutlinePlus color='#fff' />
        ) : (
          <>
            <AiOutlinePlus color='#fff' />
            <span style={{ marginLeft: '10px' }}>Create new</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody p='50px'></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

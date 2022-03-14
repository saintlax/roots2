import { isValidElement, Children, cloneElement } from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

export default function CustomModal({
  removeHeader,
  btnTitle,
  btnIcon,
  title,
  children,
  buttonProps,
  textAlign,
  size,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { onClose });
    }

    return child;
  });
  return (
    <>
      <Button
        _focus={{ border: 'none', bg: 'transparent' }}
        leftIcon={btnIcon}
        onClick={onOpen}
        w='100%'
        bg='transparent'
        _hover={{ opacity: 0.8 }}
        justifyContent='flex-start'
        pl={0}
        {...buttonProps}
      >
        {btnTitle}
      </Button>
      <ChakraModal
        size={size || '2xl'}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius='10px' p='5' py='10'>
          {!removeHeader && (
            <>
              <ModalHeader
                textAlign={textAlign}
                py={0}
                pb={1}
                fontWeight='bold'
              >
                {title}
              </ModalHeader>
              <ModalCloseButton mt={10} _focus={{ borderBox: 'none' }} />
            </>
          )}
          <ModalBody
          // py={{ base: 4, md: 4, lg: 6 }}
          >
            {childrenWithProps}
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

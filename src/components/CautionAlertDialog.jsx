import React from "react";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  AlertDialogCloseButton,
  Text,
} from "@chakra-ui/react";

export default function CautionAlertDialog({
  onContinue,
  bg,
  noText,
  yesText,
  small = false,
  mt,
  btnTitle = "null",
  cautionTitle,
  icon = false,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const BTN = { _focus: { boxShadow: "none" } };

  const handleClick = () => {
    onClose();
    onContinue(true);
  };

  return (
    <>
      {icon ? (
        <Text ml="3PX" cursor="pointer" onClick={onOpen}>
          {icon}
        </Text>
      ) : (
        <Button
          background={bg ? bg : "#FF6F6F"}
          size={small ? "xs" : "md"}
          marginTop={mt ? mt : "0"}
          color="#fff"
          borderRadius="3px"
          _focus={{ boxShadow: "none" }}
          _hover={{ bg: bg ? bg : "#FF6F6F" }}
          onClick={onOpen}
        >
          {btnTitle}
        </Button>
      )}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize={"18px"}>
            {cautionTitle}
          </AlertDialogHeader>
          <Text px="20px" fontSize={"16px"} textAlign={"center"}>
            By deactivating merchant, you won’t be able to manage and see
            merchant progress.
          </Text>
          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Button
              {...BTN}
              bg="green"
              color={"#fff"}
              ref={cancelRef}
              onClick={onClose}
              width="100%"
              fontSize={"14px"}
            >
             {noText || "No"}
            </Button>
            <Button
              {...BTN}
              width="100%"
              bg="red"
              colorScheme="red"
              onClick={handleClick}
              ml={3}
              fontSize={"14px"}
            >
              {yesText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

import { Box, Circle, HStack, Stack, Text } from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const Notifications = () => {
  return (
    <Stack minH='50vh' pr=''>
      <Text as='h3' fontSize='18px' pb='3'>
        Notification
      </Text>
      <Box px='10'>
        <Stack
          p='5'
          borderRadius='10px'
          border='1px solid rgba(196, 196, 196, 0.15)'
          flex={1}
        >
          <HStack justify='space-between' mb='3'>
            <Text>New</Text>
            <BiDotsHorizontalRounded size={30} />
          </HStack>
          {[...Array(3)].map(() => (
            <HStack py='1'>
              <Circle h='25px' w='25px' bg='rgba(196, 196, 196, 0.15)' />
              <Text>
                You have successfully created Ikeja Branch, click here to view
              </Text>
            </HStack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Notifications;

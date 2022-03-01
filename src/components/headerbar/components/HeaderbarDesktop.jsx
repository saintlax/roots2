import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { IoIosArrowDown, IoMdNotifications } from 'react-icons/io';
import MyInput from './MyInput';

const HeaderbarDesktop = () => {
  return (
    <Box p='5' w='100%' justify='space-between' bg='#fff'>
      <Flex w='95%' justify='space-between'>
        <HStack>
          <MyInput
            placeholder='Search Product'
            hasRightIcon
            RightIcon={<BiSearch />}
          />
        </HStack>
        <HStack gap='2'>
          <IoMdNotifications size={25} />
          <Avatar
            size='sm'
            name='Kent Dodds'
            src='https://bit.ly/kent-c-dodds'
          />
          <Text>Carter Kenter</Text>
          <IoIosArrowDown />
        </HStack>
      </Flex>
    </Box>
  );
};

export default HeaderbarDesktop;

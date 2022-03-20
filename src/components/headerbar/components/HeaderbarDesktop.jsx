import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
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

          <Menu>
            <MenuButton
              bg='transparent'
              as={Button}
              size='sm'
              _hover={{ bg: '#f8f8f8' }}
              _focus={{ border: 'none' }}
              _active={{ bg: '#f8f8f8' }}
              rightIcon={<IoIosArrowDown />}
            >
              <HStack>
                <Avatar
                  size='sm'
                  name='Kent Dodds'
                  src='https://bit.ly/kent-c-dodds'
                />
                <Text>Carter Kenter</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default HeaderbarDesktop;

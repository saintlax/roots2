import {
  HStack,
  Flex,
  Avatar,
  Text,
  Box,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiSearch } from 'react-icons/bi';
import { IoIosArrowDown, IoMdNotifications } from 'react-icons/io';
import MyInput from './components/MyInput';
import IsMobile from '../common/IsMobile';

const Headerbar = ({ setShowMenu }) => {
  // export const [isMobile] = useMediaQuery('(max-width:990px)');
  const isMobileScreen = IsMobile();

  return (
    <Box p='5' w='100%' justify='space-between' bg='#fff'>
      <Flex w='95%' justify='space-between'>
        <HStack>
          {isMobileScreen && (
            <GiHamburgerMenu onClick={setShowMenu} size={25} />
          )}
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

export default Headerbar;

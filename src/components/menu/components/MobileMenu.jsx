import {
  Avatar,
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  Img,
  ListIcon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import logo from '../../../assets/icons/logo.svg';
import { navLinks } from './sidebarData';

const MobileMenu = ({ onClose }) => {
  const { pathname } = useLocation();
  const [link] = navLinks;

  const handleClick = () => {
    onClose();
    console.log({ link, pathname });
  };

  return (
    <Stack gap='1rem' bg='primary' w='100%' className='mobile-menu'>
      <HStack align='center' justify={'space-between'} pr='60px'>
        <Box mt='2' onClick={onClose}>
          <IoMdClose size={25} />
        </Box>
        <HStack alignSelf={'center'}>
          <Circle mt='2' p='2' bg='#fff'>
            <Img src={logo} alt='logo' />
          </Circle>
          <Heading fontSize='25px' fontWeight={400} color='#fff'>
            roots
          </Heading>
        </HStack>
      </HStack>

      <Flex align={'center'} gap='2.5'>
        <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
        <Stack>
          <Text>Carter Kenter</Text>
          <Text fontSize={'12px'} color='#9AA1D0;' mt='0 !important'>
            View Profile
          </Text>
        </Stack>
      </Flex>

      <UnorderedList w='100%' styleType='none' spacing='12px'>
        {navLinks.map((link, i) => (
          <ListItem className='list-item' key={i} onClick={handleClick}>
            <NavLink to={link?.to ? link.to : '/'} className='nav-link'>
              <ListIcon fontSize='20px' mr='15px' as={link.icon} />
              {link.title}
            </NavLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Stack>
  );
};

export default MobileMenu;

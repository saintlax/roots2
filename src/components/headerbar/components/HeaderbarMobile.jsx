import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import CustomDrawer from '../../common/CustomDrawer';
import MobileMenu from '../../menu/components/MobileMenu';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineBell } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { getComponentTitle } from './getComponentTitle';

const HeaderbarMobile = () => {
  const { pathname } = useLocation();

  console.log({ pathname });

  return (
    <HStack
      justify='space-between'
      py='3'
      px='4'
      mx='auto'
      w='100%'
      bg='primary'
      color='#FFF'
    >
      <CustomDrawer
        buttonProps={{ size: 'sm', p: 0 }}
        btn={<HiOutlineMenuAlt1 size={25} />}
      >
        <MobileMenu />
      </CustomDrawer>

      <Text fontWeight='500' fontSize='20px'>
        {getComponentTitle(pathname)}
      </Text>
      <Flex align={'center'} gap='3' pr='3'>
        <BiSearch size={25} />
        <Menu>
          <MenuButton pos='relative' cursor='pointer'>
            <Badge {...badgeSTyles}>3</Badge>
            <AiOutlineBell size={25} />
          </MenuButton>
          <Portal>
            <MenuList>
              <MenuItem>All notifications</MenuItem>
              <MenuItem>Read Notifications</MenuItem>
              <MenuItem>Unread Notifications</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
      </Flex>
    </HStack>
  );
};

export default HeaderbarMobile;

const badgeSTyles = {
  fontSize: '10px',
  pos: 'absolute',
  borderRadius: '50%',
  h: '15px',
  w: '15px',
  top: '0',
  right: 0,
};

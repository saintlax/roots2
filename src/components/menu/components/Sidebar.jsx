import {
  Circle,
  Heading,
  HStack,
  Img,
  ListIcon,
  ListItem,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from './sidebarData';

import logo from '../../../assets/icons/logo.svg';

const Sidebar = () => {
  return (
    <div className={'sidebar'}>
      <Stack
        zIndex={10}
        w='210px'
        h='100%'
        minH='100vh'
        bg='primary'
        color='#fff'
        gap='2rem'
        p='5'
      >
        <HStack align='center'>
          <Circle mt='2' p='2.5' bg='#fff'>
            <Img src={logo} alt='logo' />
          </Circle>
          <Heading fontWeight={400} color='#fff'>
            roots
          </Heading>
        </HStack>

        <UnorderedList w='100%' styleType='none' spacing='1rem'>
          {navLinks.map((link, i) => (
            <ListItem key={i} className='list-item'>
              <NavLink
                to={link?.to ? link.to : '/'}
                // style={activeStyles}
                className='nav-link'
              >
                <ListIcon fontSize='20px' mr='15px' as={link.icon} />
                {link.title}
              </NavLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Stack>
    </div>
  );
};

export default Sidebar;

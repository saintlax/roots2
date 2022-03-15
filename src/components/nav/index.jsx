import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import './index.css';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineBell } from 'react-icons/ai';
import { MERCHANT_NAV_ITEMS } from './components/nav.constant';
import { LinkTo } from './components/LinkTo';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSettings, FiLogIn } from 'react-icons/fi';
import logo from './images/Vector.svg';
import CustomModal from '../../components/common/CustomModal';
import ViewProfile from '../../pages/Merchant/dashboard/components/ViewProfile';
import Settings from '../../pages/Merchant/dashboard/components/Settings';
import Notifications from './components/Notification';
import { ComponentTitle } from './components/ComponentTitile';
import { useLocation } from 'react-router-dom';

export const Nav = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Box width={'100%'} height={['100%']} bg='#fff'>
        <Flex
          width={'100%'}
          height={['88px']}
          bg={'#1459DF'}
          px={['10px', '10px', '10px', '20px', '30px']}
          alignItems='center'
          justifyContent={[
            'space-between',
            'space-between',
            'space-between',
            'center',
          ]}
        >
          <Flex
            width={['100%', '100%', '100%', '100%', '85%']}
            justifyContent={['space-between']}
          >
            <Flex
              display={['none', 'none', 'flex']}
              justifyContent='space-between'
              alignItems={'center'}
              color={'#fff'}
              width={['20%', '20%', '9.5%']}
              cursor='pointer'
            >
              <Circle bg='#fff' size='40px'>
                <Image boxSize='20px' src={logo} alt='logo' />
              </Circle>
              <Text fontSize={'26px'}>roots</Text>
            </Flex>
            <Circle display={['block', 'block', 'none']} width={['20%', '20%']}>
              <Avatar
                size='md'
                name='Dan Abrahmov'
                src='https://bit.ly/dan-abramov'
              />
            </Circle>

            <Flex
              justifyContent={'center'}
              alignItems='center'
              width={['60%', '70%', '60%', '62%']}
            >
              <Text
                color={'#fff'}
                textAlign='center'
                display={['block', 'block', 'none']}
              >
                {ComponentTitle(pathname)}
              </Text>
              <InputGroup display={['none', 'none', 'block']}>
                <InputRightElement
                  pointerEvents='none'
                  children={<BsSearch size='20px' />}
                  p='10px'
                />
                <Input
                  width='100%'
                  bg={'#D0DEF9B2'}
                  color='#fff'
                  type='search'
                  placeholder='Search'
                  py='7px'
                  px='20px'
                  borderRadius={'15px'}
                />
              </InputGroup>
            </Flex>
            <Flex
              width={['15%', '20%', '25%', '20%', '20%']}
              justifyContent='space-between'
              alignItems={'center'}
              color='#fff'
            >
              <Box display={['block', 'block', 'none']}>
                <BsSearch size='20px' />
              </Box>
              <CustomModal
                buttonProps={{}}
                btnIcon={<AiOutlineBell size={'26px'} />}
              >
                <Notifications />
              </CustomModal>

              <Box display={['none', 'none', 'block']}>
                <Menu>
                  <MenuButton
                    bg='transparent'
                    as={Button}
                    size='sm'
                    _hover={{ bg: '#1459DF' }}
                    _focus={{ border: 'none' }}
                    _active={{ bg: '#1459DF' }}
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
                  <MenuList color='darkGray'>
                    <MenuItem>
                      <CustomModal
                        title={'Profile'}
                        btnIcon={
                          <Avatar size='sm' src='https://bit.ly/kent-c-dodds' />
                        }
                        btnTitle='Profile'
                      >
                        <ViewProfile />
                      </CustomModal>
                    </MenuItem>

                    <MenuItem>
                      <CustomModal
                        btnIcon={<FiSettings size={26} />}
                        btnTitle='Settings'
                        title={'Settings'}
                      >
                        <Settings />
                      </CustomModal>
                    </MenuItem>
                    <MenuItem>
                      <Box mr='12px'>
                        <FiLogIn size={26} />
                      </Box>
                      <span>Logout</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
                {/* <Text>Dan Abramov</Text> */}
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Box
          // display={["none", "none", "block"]}
          className='nav-links'
          position={['fixed', 'fixed', 'relative']}
          bottom={[0]}
          // boxShadow="2xl"
          p='6'
          // rounded="md"
          width={'100%'}
          height={[0, 0, '88px']}
          // bg={"white"}
          // px={["60px"]}
        >
          <Flex
            alignItems='center'
            width={['100%', '100%', '80%', '65%']}
            height={['100%']}
            justifyContent={['space-between']}
            px={['0%', '0%', '8.5%']}
          >
            {MERCHANT_NAV_ITEMS.map(({ title, to, icon }, id) => (
              <LinkTo
                key={id}
                to={to}
                title={title}
                // toggle={toggle}
                id={1}
                iconComponent={icon}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

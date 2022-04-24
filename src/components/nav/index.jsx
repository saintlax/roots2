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
import React, { useState } from 'react';
import './index.css';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineBell } from 'react-icons/ai';
import { MERCHANT_NAV_ITEMS, STAFF_NAV_ITEMS } from './components/nav.constant';
import { LinkTo } from './components/LinkTo';
import { IoIosArrowDown } from 'react-icons/io';
import { FiSettings, FiLogIn } from 'react-icons/fi';
import logo from './images/Vector.svg';
import CustomModal from '../../components/common/CustomModal';
import ViewMerchantProfile from '../../pages/Merchant/dashboard/components/ViewProfile';
import ViewUserProfile from '../../pages/Merchant/dashboard/components/ViewUserProfile';
import Settings from '../../pages/Merchant/dashboard/components/Settings';
import Notifications from './components/Notification';
import { ComponentTitle } from './components/ComponentTitile';
import { useLocation } from 'react-router-dom';
import { MerchantSideBar } from './components/merchantSideBar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from '../../redux/constants/action-types';
const {
  REACT_APP_API_URL,
  REACT_APP_MERCHANT,
  REACT_APP_USER,
  REACT_APP_USER_BRANCH,
} = process.env;
export const Nav = () => {
  const { pathname } = useLocation();
  const [showInput, setShowInput] = useState(false);
  const userBranch = useSelector((state) => state.userBranch);
  const merchant = useSelector((state) => state.merchant);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMerchant = () => {
    if (userBranch && Object.keys(userBranch).length === 0) return true;
    else return false;
  };

  const ShowLinkTo = () => {
    if (userBranch && Object.keys(userBranch).length === 0) {
      return MERCHANT_NAV_ITEMS.map(({ title, to, icon }, id) => (
        <LinkTo key={id} to={to} title={title} id={1} iconComponent={icon} />
      ));
    } else {
      return STAFF_NAV_ITEMS.map(({ title, to, icon }, id) => (
        <LinkTo key={id} to={to} title={title} id={1} iconComponent={icon} />
      ));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(REACT_APP_USER);
    dispatch({
      type: ActionTypes.DELETE_USER,
      payload: null,
    });
    localStorage.removeItem(REACT_APP_MERCHANT);
    dispatch({
      type: ActionTypes.DELETE_MERCHANT,
      payload: null,
    });

    localStorage.removeItem(REACT_APP_USER_BRANCH);
    dispatch({
      type: ActionTypes.DELETE_USER_BRANCH,
      payload: null,
    });
    navigate('/');
  };

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
            <MerchantSideBar />

            <Flex
              justifyContent={'center'}
              alignItems='center'
              width={['60%', '70%', '60%', '62%']}
            >
              <Text
                color={'#fff'}
                fontSize='18px'
                textAlign='center'
                display={['block', 'block', 'none']}
              >
                {showInput ? (
                  <Input type='text' bg='#fff' color='grey' />
                ) : (
                  ComponentTitle(pathname)
                )}
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
              <Box
                display={['block', 'block', 'none']}
                onClick={() => setShowInput(!showInput)}
              >
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
                        name={
                          user?.firstName +
                          ' ' +
                          user?.lastName +
                          ' ' +
                          user?.middleName
                        }
                        src='https://bit.ly/kent-c-dodds'
                      />
                      <Text>
                        {user?.firstName +
                          ' ' +
                          user?.lastName +
                          ' ' +
                          user?.middleName}
                      </Text>
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
                        {isMerchant() ? (
                          <ViewMerchantProfile
                            user={user}
                            merchant={merchant}
                          />
                        ) : (
                          <ViewUserProfile user={user} />
                        )}
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
                    <MenuItem onClick={handleLogout}>
                      <Box mr='12px'>
                        <FiLogIn size={26} />
                      </Box>
                      <span>Log out</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        <Box
          className='nav-links'
          position={['fixed', 'fixed', 'relative']}
          bottom={[0]}
          p='6'
          width={'100%'}
          height={[0, 0, '88px']}
        >
          <Flex
            alignItems='center'
            width={['100%', '100%', '80%', '90%']}
            height={['100%']}
            justifyContent={['space-between']}
            px={['0%', '0%', '8.5%']}
          >
            {/* {MERCHANT_NAV_ITEMS.map(({ title, to, icon }, id) => (
              <LinkTo
                key={id}
                to={to}
                title={title}
                id={1}
                iconComponent={icon}
              />
            ))} */}
            <ShowLinkTo />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

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
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ActionTypes } from '../../../redux/constants/action-types';
const {
  REACT_APP_API_URL,
  REACT_APP_MERCHANT,
  REACT_APP_USER,
  REACT_APP_USER_BRANCH,
} = process.env;
const HeaderbarDesktop = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Box p='5' w='100%' justify='space-between' bg='#fff'>
      <Flex w='95%' justify='space-between'>
        <HStack>
          <MyInput
            placeholder='Search Products'
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
                  name={
                    user?.firstName +
                    ' ' +
                    user?.lastName 
                    // +
                    // ' ' +
                    // user?.middleName
                  }
                  // src='https://bit.ly/kent-c-dodds'
                />
                <Text>
                  {user?.firstName +
                    ' ' +
                    user?.lastName 
                    // +
                    // ' ' +
                    // user?.middleName
                    }
                </Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default HeaderbarDesktop;

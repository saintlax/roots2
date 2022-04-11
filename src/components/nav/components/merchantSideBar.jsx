import {
  Avatar,
  Box,
  Circle,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import CustomModal from '../../common/CustomModal';
import { FiSettings, FiLogIn } from 'react-icons/fi';
import Settings from '../../../pages/Merchant/dashboard/components/Settings';
import ViewMerchantProfile from '../../../pages/Merchant/dashboard/components/ViewProfile';
import logo from '../images/Vector.svg';

export const MerchantSideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement] = useState('left');

  return (
    <>
      <Circle
        onClick={onOpen}
        display={['block', 'block', 'none']}
        width={['20%', '20%']}
      >
        <Avatar
          size='md'
          name='Dan Abrahmov'
          src='https://bit.ly/dan-abramov'
        />
      </Circle>

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg='#1459DF' color={'#fff'}>
          <DrawerCloseButton />
          <DrawerHeader textAlign={'center'} borderBottomWidth='1px'>
            <Flex
              justifyContent='center'
              alignItems={'center'}
              color={'#fff'}
              // width={["20%", "20%", "9.5%"]}
              cursor='pointer'
            >
              <Circle bg='#fff' size='40px'>
                <Image boxSize='20px' src={logo} alt='logo' />
              </Circle>
              <Text fontSize={'26px'}>roots</Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <CustomModal
              title={'Profile'}
              btnIcon={<Avatar size='sm' src='https://bit.ly/kent-c-dodds' />}
              btnTitle='Profile'
            >
              <ViewMerchantProfile />
            </CustomModal>

            <CustomModal
              btnIcon={<FiSettings size={30} />}
              btnTitle='Settings'
              title={'Settings'}
            >
              <Settings />
            </CustomModal>
            <Box position={'absolute'} bottom='20%'>
              <Flex>
                <Box mr='12px'>
                  <FiLogIn size={26} />
                </Box>
                <span>Logout</span>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

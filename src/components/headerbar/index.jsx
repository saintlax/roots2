import IsMobile from '../common/IsMobile';
import HeaderbarMobile from './components/HeaderbarMobile';
import HeaderbarDesktop from './components/HeaderbarDesktop';

const Headerbar = () => {
  const isMobileScreen = IsMobile();

  return isMobileScreen ? <HeaderbarMobile /> : <HeaderbarDesktop />;
  // (
  // <Box p='5' w='100%' justify='space-between' bg='#fff'>
  //   <Flex w='95%' justify='space-between'>
  //     <HStack>
  //       {isMobileScreen && (
  //         <CustomDrawer
  //           className='drawer'
  //           buttonProps={{ size: 'md' }}
  //           btn={<HiOutlineMenuAlt1 size={25} />}
  //         >
  //           <MobileMenu />
  //         </CustomDrawer>
  //       )}

  //       <MyInput
  //         placeholder='Search Product'
  //         hasRightIcon
  //         RightIcon={<BiSearch />}
  //       />
  //     </HStack>
  //     <HStack gap='2'>
  //       <IoMdNotifications size={25} />
  //       <Avatar
  //         size='sm'
  //         name='Kent Dodds'
  //         src='https://bit.ly/kent-c-dodds'
  //       />
  //       <Text>Carter Kenter</Text>
  //       <IoIosArrowDown />
  //     </HStack>
  //   </Flex>
  // </Box>
  // );
};

export default Headerbar;

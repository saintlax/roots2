// import {
//   Box,
//   Circle,
//   Heading,
//   HStack,
//   Img,
//   ListIcon,
//   ListItem,
//   Stack,
//   UnorderedList,
// } from '@chakra-ui/react';
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { IoMdClose } from 'react-icons/io';

// import logo from '../../assets/icons/logo.svg';
// import { navLinks } from '../sidebar/components/sidebarData';

// const MobileMenu = () => {
//   return (
//     <div>
//       <Stack
//         zIndex={10}
//         w='250px'
//         h='100vh'
//         bg='primary'
//         color='#f0f'
//         gap='2rem'
//         p='5'
//       >
//         <HStack align='center' justify={'space-between'} px='2'>
//           <Box mt='2'>
//             <IoMdClose size={25} />
//           </Box>
//           <HStack alignSelf={'center'}>
//             <Circle mt='2' p='2' bg='#fff'>
//               <Img src={logo} alt='logo' />
//             </Circle>
//             <Heading fontSize='25px' fontWeight={400} color='#fff'>
//               roots
//             </Heading>
//           </HStack>
//         </HStack>

//         <UnorderedList w='100%' styleType='none' spacing='1.5rem'>
//           {navLinks.map((link, i) => (
//             <ListItem className='list-item'>
//               <NavLink
//                 key={i}
//                 to={link?.to ? link.to : '/'}
//                 // style={activeStyles}
//                 className='nav-link'
//               >
//                 <ListIcon fontSize='20px' mr='15px' as={link.icon} />
//                 {link.title}
//               </NavLink>
//             </ListItem>
//           ))}
//         </UnorderedList>
//       </Stack>
//     </div>
//   );
// };

// export default MobileMenu;

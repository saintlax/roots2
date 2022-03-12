import {
  Box,
  Img,
  Stack,
  Text,
  Circle,
  HStack,
  FormControl,
} from '@chakra-ui/react';
import profileBg from '../../../../assets/images/profile background.svg';
import profilePic from '../../../../assets/images/profile-pic.svg';
import { AiOutlineClose } from 'react-icons/ai';
import FormInput from '../../../../components/common/FormInput';
import { BiLock, BiPencil } from 'react-icons/bi';

const ViewProfile = ({ onClose }) => {
  return (
    <Stack h='100%' px={[0, 2, 5]} w='100%'>
      <Box px={[null, null, '5%']} pos='relative'>
        <Box>
          <Img src={profileBg} alt='background' />
        </Box>
        <Circle pos='absolute' className='profile-pic'>
          <Img w='100%' h='100%' src={profilePic} alt='profile picture' />
        </Circle>
        <FormControl mt='80px'>
          <Stack
            spacing={[null, null, '5']}
            direction={['column', 'column', 'row']}
          >
            <FormInput
              icon={<BiLock />}
              label='Business Name'
              placeholder='Emeka and Sons'
            />
            <FormInput
              icon={<BiPencil />}
              label='Email'
              placeholder='Obi@gmail.com'
            />
          </Stack>
          <FormInput
            icon={<BiPencil />}
            label='Headquater Address'
            placeholder={'Headquater Address'}
          />
          <Box pos='relative'>
            <FormInput
              icon={<BiLock />}
              label='CAC Document'
              placeholder={'Headquater Address'}
            />
            <HStack pos='absolute' top='-5px' bottom='0' right='50px'>
              <Text fontSize={'12px'}>View</Text>
              <Text as='small'>Download</Text>
            </HStack>
          </Box>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default ViewProfile;

import { Box, Img, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import prorileBg from '../../../../assets/images/profile background.svg';
import prorilePic from '../../../../assets/images/profile background.svg';

const ViewProfile = () => {
  return (
    <Stack>
      <Text as='h1'>Profile</Text>
      <Box>
        <Box
          bgImage={prorileBg}
          bgPosition='center'
          bgRepeat='no-repeat'
          bgSize={'cover'}
        >
          <Img src={prorilePic} alt='profile picture' />
        </Box>
      </Box>
    </Stack>
  );
};

export default ViewProfile;

import { HStack, Stack, Text } from '@chakra-ui/react';
import { FiTrendingUp } from 'react-icons/fi';

const BranchPerRevenue = () => {
  return (
    <Stack bg='#fff' h='100%' p='8' spacing='15px' borderRadius={10}>
      <Text as='h3' pb='2'>
        Branch per Revenue Generated
      </Text>
      {[...Array(4)].map((item, index) => (
        <HStack key={index} justify={'space-between'}>
          <Stack>
            <Text>Ikeja Branch</Text>
            <Text as='small' mt='0 !important'>
              All time revenue
            </Text>
          </Stack>
          <Stack>
            <Text>N250,000</Text>
            <HStack mt='0 !important' as='small' color={'green'}>
              <Text>+2.3 %</Text>
              <FiTrendingUp />
            </HStack>
          </Stack>
        </HStack>
      ))}
    </Stack>
  );
};

export default BranchPerRevenue;

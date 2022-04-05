import { HStack, Stack, Text } from '@chakra-ui/react';
import { FiTrendingUp } from 'react-icons/fi';

const BranchPerRevenue = ({ branchesReports }) => {
  return (
    <Stack bg='#fff' h='100%' p='8' spacing='15px' borderRadius={10}>
      <Text as='h3' pb='2'>
        Branch per Revenue Generated
      </Text>
      {branchesReports.map((item, index) => (
        <HStack key={index} justify={'space-between'}>
          <Stack>
            <Text>{item?.branch}</Text>
            <Text as='small' mt='0 !important'>
              All time revenue
            </Text>
          </Stack>
          <Stack>
            <Text>N{item?.amount}</Text>
            <HStack mt='0 !important' as='small' color={'green'}>
              <Text>+{item.percent} %</Text>
              <FiTrendingUp />
            </HStack>
          </Stack>
        </HStack>
      ))}
    </Stack>
  );
};

export default BranchPerRevenue;

import {
  Box,
  Circle,
  Divider,
  Text,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { recentActivities } from './recentActivitiesData';

const RecentActivities = () => {
  return (
    <Stack bg='#fff' borderRadius={5} p='5' h='470px'>
      {recentActivities.map((activity, index) => (
        <HStack key={index} mt='0 !important'>
          <VStack h='100%' spacing='0'>
            <Circle
              h='10px'
              w='10px'
              border='5px solid #7a9de0'
              p='1'
              bg='primary'
            ></Circle>
            <Box
              h='100%'
              w='0.2px'
              border='0.2px dashed rgb(122,157,224)'
            ></Box>
          </VStack>
          <Stack spacing='0' pb='3'>
            <Text color='darkGray'>{activity.activity} </Text>
            <Text color='primary'>{activity.name}</Text>
            <Text as='small' color='lightGray'>
              {activity.time}
            </Text>
          </Stack>
        </HStack>
      ))}
    </Stack>
  );
};

export default RecentActivities;

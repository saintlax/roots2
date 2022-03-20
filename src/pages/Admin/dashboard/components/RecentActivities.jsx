import {
  Box,
  Circle,
  Text,
  HStack,
  Stack,
  VStack,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { recentActivities } from './recentActivitiesData';

const RecentActivities = () => {
  return (
    <Stack
      bg='#fff'
      borderRadius={5}
      p='5'
      maxW='450px'
      overflowY='auto'
      maxH={'470px'}
    >
      {recentActivities.map((activity, index, arr) => (
        <HStack key={index} mt='0 !important'>
          <VStack h='100%' spacing='0' mt='8px'>
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
              border={
                index !== arr.length - 1 && '0.2px dashed rgb(122,157,224)'
              }
            ></Box>
          </VStack>
          <Flex
            w='100%'
            spacing='0'
            direction={['row', 'row', 'column']}
            pb='3'
            gap={['3', '3', '1']}
            wrap={['wrap']}
          >
            <Text color='darkGray'>{activity.activity} </Text>
            <Text color='primary'>{activity.name}</Text>
            <Text
              flex={[null, 1]}
              textAlign={['right', '', 'left']}
              fontSize='13px'
              color='lightGray'
            >
              {activity.time}
            </Text>
          </Flex>
        </HStack>
      ))}
    </Stack>
  );
};

export default RecentActivities;

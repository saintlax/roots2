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
// import { recentActivities } from './recentActivitiesData';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
const { REACT_APP_API_URL } = process.env;

const RecentActivities = () => {
  const recentActivities = useSelector(
    (state) => state.recentActivities.activities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getRecentActivities();
  }, []);
  const getRecentActivities = async () => {
    await Axios.get(`${REACT_APP_API_URL}/recentActivities`)
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({
            type: ActionTypes.REFRESH_RECENT_ACTIVITY,
            payload,
          });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTime = (unix_timestamp) => {
    var date = new Date(unix_timestamp);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    var seconds = '0' + date.getSeconds();

    var formattedTime =
      hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  };
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
              {getTime(activity.time)}
            </Text>
          </Flex>
        </HStack>
      ))}
    </Stack>
  );
};

export default RecentActivities;

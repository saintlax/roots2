import { Circle, Square, Stack, Text, HStack } from '@chakra-ui/react';
import { BiWalletAlt } from 'react-icons/bi';
import { MdTrendingUp } from 'react-icons/md';

const Card = (props) => {
  console.log(props);
  const { amount, icon, iconBg, percentage, title } = props;

  return (
    <Square bg='white' w='260px' p='5' borderRadius={8} gap='6'>
      <Circle bg={iconBg} p='3'>
        {/* <BiWalletAlt size={30} color='#1459DF' /> */}
        {icon}
      </Circle>
      <Stack>
        <Text fontSize='18px' fontWeight='600'>
          {amount}
        </Text>
        <Text>{title}</Text>
        <HStack color='green'>
          <MdTrendingUp />
          <Text>
            {percentage}% <span style={{ color: '#07163E' }}>this month</span>
          </Text>
        </HStack>
      </Stack>
    </Square>
  );
};

export default Card;

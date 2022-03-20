import { Circle, Square, Stack, Text, HStack } from '@chakra-ui/react';
import { MdTrendingUp } from 'react-icons/md';

const Card = (props) => {
  const { amount, icon, iconBg, percentage, title, className } = props;

  return (
    <Square
      bg='white'
      className={className}
      py={['5']}
      borderRadius={8}
      gap='6'
    >
      <Circle bg={iconBg} p='3'>
        {icon}
      </Circle>
      <Stack>
        <Text fontSize={'24px'} as='h3'>
          {amount}
        </Text>
        <Text m='0 !important'>{title}</Text>
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

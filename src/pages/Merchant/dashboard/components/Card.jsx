import { HStack, Stack, Text } from '@chakra-ui/react';
import { FiTrendingUp } from 'react-icons/fi';

const Card = ({ className, title, amount, percentage }) => {
  return (
    <Stack
      className={className}
      bg='#fff'
      py='10'
      px='8'
      borderRadius={'10'}
      spacing='10px'
      shadow='base'
    >
      <Text as='h4'>{title}</Text>
      <Text as='h1' pt='2'>
        {amount}
      </Text>
      <HStack as='small' color='green'>
        <Text as='small' color='green'>
          +{percentage}%
        </Text>
        <FiTrendingUp />
        <Text>Last week</Text>
      </HStack>
    </Stack>
  );
};

export default Card;

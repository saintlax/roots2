import { Button, Flex, HStack, Img, Stack, Text } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import firstBank from '../../../../assets/icons/firstbank.png';

const BankSettings = () => {
  return (
    <Stack spacing='5' pt='5' minH='50vh'>
      <HStack justify='space-between'>
        <Text as='h3'>Bank Information</Text>
        <Button
          bg='primary'
          leftIcon={<AiOutlinePlus />}
          color='#fff'
          w='120px'
        >
          Add new
        </Button>
      </HStack>
      <Flex
        gap='3'
        p='2'
        align='center'
        borderRadius='5px'
        border='1px solid #eee'
      >
        <Img src={firstBank} alt='bank' />
        <Text as='small'>First Bank of Nigeria (5015)</Text>
      </Flex>
    </Stack>
  );
};

export default BankSettings;

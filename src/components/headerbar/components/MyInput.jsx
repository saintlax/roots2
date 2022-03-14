import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';

const MyInput = (props) => {
  const { hasRightIcon, placeholder, hasLeftIcon, LeftIcon, RightIcon } = props;

  const [value, setValue] = useState('');
  const [show] = useState(false);

  return (
    <Box pl='1rem'>
      <InputGroup size='md'>
        {hasLeftIcon && (
          <InputLeftElement width='4.5rem'>{LeftIcon}</InputLeftElement>
        )}
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size='sm'
          w='400px'
          borderRadius={5}
          bg='#FAFAFA'
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
        />
        {hasRightIcon && (
          <InputRightElement pb='2' width='2.5rem'>
            {RightIcon}
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};

export default MyInput;

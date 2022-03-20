import { FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/react';

const FormInput = ({ label, type, icon, placeholder, ...props }) => {
  return (
    <Stack pos='relative'>
      <FormLabel {...labelStyles} mb={1} fontWeight='600' fontSize='13px'>
        {label}
      </FormLabel>

      <InputGroup>
        <Input
          mb={4}
          _placeholder={{ fontSize: '12px' }}
          placeholder={placeholder}
          type={type || 'text'}
          {...props}
        />
        <InputRightElement children={icon} />
      </InputGroup>
    </Stack>
  );
};

export default FormInput;

const labelStyles = {
  color: '#C4C4C4',
  pos: 'absolute',
  zIndex: 10,
  top: '-2px',
  left: '12px',
  px: '5px',
  bg: 'white',
};

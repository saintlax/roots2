import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';

const IsMobile = () => {
  const [isMobile] = useMediaQuery('(max-width:990px)');
  return isMobile;
};

export default IsMobile;

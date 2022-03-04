import { useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const IsMobile = () => {
  const [isMobile] = useMediaQuery('(max-width:920px)');

  return isMobile;
};

export default IsMobile;

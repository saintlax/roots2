import { useMediaQuery } from '@chakra-ui/react';

const IsMobile = () => {
  const [isMobile] = useMediaQuery('(max-width:920px)');

  return isMobile;
};

export default IsMobile;

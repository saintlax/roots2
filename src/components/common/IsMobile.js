import { useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const IsMobile = () => {
  const [isMobile] = useMediaQuery('(max-width:920px)');

  // const [isMobile, setIsMobile] = useState();

  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     setIsMobile(window.innerWidth);
  //   });
  //   return () => window.removeEventListener('resize');
  // }, []);

  console.log({ isMobile });

  return isMobile;
};

export default IsMobile;

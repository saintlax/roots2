import { NavLink } from 'react-router-dom';
import { Flex, useMediaQuery, Box, Text } from '@chakra-ui/react';

export const LinkTo = ({
  type,
  to,
  classname,
  iconComponent = null,
  btn,
  title,
  toggle,
}) => {
  const [isMobileScreen] = useMediaQuery('(max-width: 600px)');

  return btn ? (
    <Flex
      direction={'row'}
      width='100%'
      _hover={{
        cursor: 'pointer',
        background: '#f2f2f2',
        borderTopLeftRadius: 40,
        fontWeight: '700',
        color: 'black',
        borderBottomLeftRadius: 40,
        flex: ' 1 0 auto',
      }}
      fontWeight='700'
      className={`${classname} link`}
    >
      <Box>{iconComponent}</Box> <Text>{title}</Text>
    </Flex>
  ) : (
    <NavLink
      style={{ fontSize: '16px' }}
      className={`${classname} link`}
      onClick={() => (isMobileScreen ? toggle() : null)}
      target={title === 'Guest CheckIn' ? '_blank' : ''}
      to={to ? to : '/'}
    >
      <Flex
        alignItems={'center'}
        justifyContent='space-between'
        fontSize={['12px', '14px', '16px', '18px']}
      >
        <Box mr='10px'>{iconComponent}</Box>

        <Text>{title}</Text>
      </Flex>
    </NavLink>
  );
};

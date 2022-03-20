import { Table, Box } from '@chakra-ui/react';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

export const OrdersTable = () => {
  return (
    <Box
      bg={'#fff'}
      borderRadius='10px'
      border={'1px solid #E5E5E5'}
      maxW={['100%', '100%']}
      overflowX={'auto'}
    >
      <Table variant='striped' colorScheme={'blackAlpha'}>
        <TableHead />
        <TableBody />
      </Table>
    </Box>
  );
};

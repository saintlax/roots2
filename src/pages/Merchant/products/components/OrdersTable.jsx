import { Table, Box } from '@chakra-ui/react';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

export const OrdersTable = () => {
  return (
    <Box
      bg={'#fff'}
      borderRadius='20px'
      border={'1px solid #E5E5E5'}
      w={'100%'}
      overflowX='auto'
    >
      <Table size='lg' variant='striped' colorScheme={'blackAlpha'}>
        <TableHead />
        <TableBody />
      </Table>
    </Box>
  );
};

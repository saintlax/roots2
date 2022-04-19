import { Table, Box } from '@chakra-ui/react';
import { MerchantOrdersTableBody } from './MerchantOrdersTableBody';
import { MerchantProductsTableBody } from './MerchantProductsTableBody';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { transactionsTableHeadData } from './tableHeadData';

export const TransactionsTable = ({ merchant, orders }) => {
  return (
    <Box
      bg={'#fff'}
      borderRadius='20px'
      Box
      maxWidth={['100%']}
      overflowX={['scroll', 'scroll', 'scroll', 'hidden']}
    >
      <Table size='md' variant='striped' colorScheme={'blackAlpha'}>
        <TableHead tableHeadData={transactionsTableHeadData} />
        <MerchantOrdersTableBody orders={orders} merchant={merchant} />
      </Table>
    </Box>
  );
};

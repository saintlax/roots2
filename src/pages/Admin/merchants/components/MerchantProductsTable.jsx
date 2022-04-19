import { Table, Box } from '@chakra-ui/react';
import { MerchantProductsTableBody } from './MerchantProductsTableBody';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { productsTableHeadData } from './tableHeadData';

export const MerchantProductsTable = ({ merchant, products }) => {
  return (
    <Box
      bg={'#fff'}
      borderRadius='20px'
      Box
      maxWidth={['100%']}
      overflowX={['scroll', 'scroll', 'scroll', 'hidden']}
    >
      <Table size='md' variant='striped' colorScheme={'blackAlpha'}>
        <TableHead tableHeadData={productsTableHeadData} />
        <MerchantProductsTableBody products={products} merchant={merchant} />
      </Table>
    </Box>
  );
};

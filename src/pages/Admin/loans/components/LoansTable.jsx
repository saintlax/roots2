import { Table, Box } from '@chakra-ui/react';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { tableHeadData } from './tableHeadData';

export const LoansTable = () => {
  return (
    <Box
      bg={'#fff'}
      borderRadius='20px'
      Box
      maxWidth={['100%']}
      overflowX={['scroll', 'scroll', 'scroll', 'hidden']}
    >
      <Table size='md' variant='striped' colorScheme={'blackAlpha'}>
        <TableHead tableHeadData={tableHeadData} />
        <TableBody />
      </Table>
    </Box>
  );
};

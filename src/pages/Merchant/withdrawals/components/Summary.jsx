import { Table, Box, Flex, Text, Select } from '@chakra-ui/react';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
// import { TopProductTableBody } from './TopProductTableBody';
import { withdrawalTableHeadData } from './tableHeadData';

export const Summary = () => {
  return (
    <Box bg={'#fff'} borderRadius='10px' border={'1px solid #E5E5E5'}>
      {/* <Flex
        justifyContent={'space-between'}
        px={['10px', '', '30px']}
        pt='10px'
      >
        <Text fontWeight={'semibold'}>My Withdrawals</Text>
        <Select
          placeholder='Last Week'
          variant='unstyled'
          _placeholder={{ fontSize: '12px' }}
          w='100px'
          size='sm'
        >
          <option>Option1</option>
          <option>Option2</option>
          <option>Option3</option>
        </Select>
      </Flex> */}
      <Box w='100%' overflowX='auto'>
        <Table variant='striped' colorScheme={'blackAlpha'}>
          <TableHead tableHeadData={withdrawalTableHeadData} />
          <TableBody />
        </Table>
      </Box>
    </Box>
  );
};

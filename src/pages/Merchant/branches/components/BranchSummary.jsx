import { Table, Box, Flex, Text, Select } from '@chakra-ui/react';
import { TopBranchTableBody } from './TopBranchTableBody';
import { TopBranchTableHead } from './TopBranchTableHead';

export const BranchSummary = () => {
  return (
    <Box
      bg={'#fff'}
      borderRadius='10px'
      border={'1px solid #E5E5E5'}
      maxW={['', '', '', '70%']}
    >
      <Flex
        justifyContent={'space-between'}
        px={['10px', '', '30px']}
        pt='10px'
      >
        <Text fontWeight={'semibold'}>Top Selling Products</Text>
        {/* <Select
          placeholder='Last Week'
          variant='unstyled'
          _placeholder={{ fontSize: '12px' }}
          w='100px'
          size='sm'
        >
          <option>Option1</option>
          <option>Option2</option>
          <option>Option3</option>
        </Select> */}
      </Flex>

      <Box maxW={['100%']} overflowX={['auto']}>
        <Table variant='striped' colorScheme={'blackAlpha'}>
          <TopBranchTableHead />
          <TopBranchTableBody />
        </Table>
      </Box>
    </Box>
  );
};

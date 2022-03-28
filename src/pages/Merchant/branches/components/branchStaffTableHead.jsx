import { Thead, Tr, Th } from '@chakra-ui/react';
import { branchStaffTableHeadData } from './tableHeadData';

export const BranchStaffTableHead = () => {
  return (
    <Thead>
      <Tr>
        {/* <Checkbox mt="35%" ml="35%" size="lg" colorScheme="orange" /> */}
        {branchStaffTableHeadData.map((data, i) => {
          return (
            <Th
              key={i}
              fontSize={['15px']}
              fontWeight='bold'
              textTransform='capitalize'
              py='25px !important'
              px={['20px !important', '40px !important']}
            >
              {data}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};

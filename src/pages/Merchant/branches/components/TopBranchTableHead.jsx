import { Thead, Tr, Th } from '@chakra-ui/react';
import { topBranchTableHeadData } from './tableHeadData';

export const TopBranchTableHead = () => {
  return (
    <Thead>
      <Tr>
        {/* <Checkbox mt="35%" ml="35%" size="lg" colorScheme="orange" /> */}
        {topBranchTableHeadData.map((data, i) => {
          return (
            <Th
              key={i}
              fontSize={['13px']}
              fontWeight='bold'
              textTransform='capitalize'
            >
              {data}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};

import { Thead, Tr, Th, Checkbox } from '@chakra-ui/react';
import { tableHeadData } from './tableHeadData';

export const TableHead = () => {
  return (
    <Thead>
      <Tr>
        {tableHeadData.map((data, i) => {
          return (
            <Th
              key={i}
              fontSize={['16px']}
              textTransform='capitalize'
              py='25px !important'
            >
              {data}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
};

import { Thead, Tr, Th, Checkbox } from '@chakra-ui/react';
// import { tableHeadData } from "./tableHeadData";

export const TableHead = ({ tableHeadData }) => {
  return (
    <Thead>
      <Tr>
        <Checkbox mt='35%' ml='35%' size='lg' colorScheme='orange' />
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

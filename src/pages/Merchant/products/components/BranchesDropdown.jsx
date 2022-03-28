import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
export const BranchesDropdown = ({ onBranchIdSelected }) => {
  const branches = useSelector((state) => state.branches);

  const handleSelection = (e) => {
    onBranchIdSelected(e.target.selectedOptions[0].value);
  };

  return (
    <Flex
      // width={'160px'}
      justifyContent='center'
      alignItems={'center'}
      bg='#fff'
      px='8px'
      borderRadius={'5px'}
    >
      <BsBagCheck size={26} />
      <Select
        size='sm'
        placeholder='Branches'
        border='none'
        _focus={{ border: 'none' }}
        onChange={(e) => handleSelection(e)}
      >
        {branches.map((branch, i) => {
          return <option value={branch.id}>{branch.name}</option>;
        })}
      </Select>
    </Flex>
  );
};

import { Flex, Select } from '@chakra-ui/react';
import { BsBagCheck } from 'react-icons/bs';
import { useEffect } from 'react';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const { REACT_APP_API_URL } = process.env;
export const BranchesDropdown = ({ onBranchIdSelected }) => {
  const branches = useSelector((state) => state.branches);
  const merchant = useSelector((state) => state.merchant);
  const userBranch = useSelector((state) => state.userBranch);
  const dispatch = useDispatch();

  useEffect(() => {
    getBranches();
  }, []);

  const handleSelection = (e) => {
    const branchId = e.target.selectedOptions[0].value;
    const branchh = branches.filter((bran) => bran.id == branchId);
    if (branchh && branchh.length > 0) {
      onBranchIdSelected(branchh[0]);
    }
    // onBranchIdSelected(e.target.selectedOptions[0].value);
  };
  const getBranches = async () => {
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `${userBranch.merchantId}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      query = `${merchant.id}`;
    }
    await Axios.get(
      `${REACT_APP_API_URL}/branches/filter/filter?merchantId=${query}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.REFRESH_BRANCH, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex
      // width={'160px'}
      justifyContent='center'
      alignItems={'center'}
      bg='#fff'
      borderRadius={'5px'}
    >
      {/* <BsBagCheck size={26} /> */}
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

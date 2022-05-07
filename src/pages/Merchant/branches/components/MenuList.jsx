import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import CautionAlertDialog from '../../../../components/CautionAlertDialog';
import { useSelector, useDispatch } from 'react-redux';
//import { addBranch } from '../../../../redux/actions/branchActions';
import { ActionTypes } from '../../../../redux/constants/action-types';
import { EditBranchModal } from './EditBranchModal';
import { BranchDetailModal } from './BranchDetailModal';
import { DeactivateBranchAlert } from './DeactivateBranchAlert';

export const MenuLItems = ({ name, dateCreated, branch }) => {
  const dispatch = useDispatch();

  const deleteBranch = () => {
    dispatch({
      type: ActionTypes.DELETE_BRANCH,
      payload: branch,
    });
  };
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <BranchDetailModal
              name={name}
              dateCreated={dateCreated}
              branch={branch}
            />
          </MenuItem>
          <MenuItem>
            {/* <FiEdit />
            <span style={{ marginLeft: '10px' }}>Edit</span> */}
            <EditBranchModal branch={branch} />
          </MenuItem>
          <MenuItem>
            <DeactivateBranchAlert branch={branch} />
          </MenuItem>
          {/* <MenuItem onClick={deleteBranch}>
            <FiTrash />
            <span style={{ marginLeft: '10px' }}>Delete</span>
          </MenuItem> */}
        </MenuList>
      </Menu>
    </>
  );
};

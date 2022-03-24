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
import { UserModal } from './UserModal';
import CautionAlertDialog from '../../../../components/CautionAlertDialog';
import { useSelector, useDispatch } from 'react-redux';
//import { addBranch } from '../../../../redux/actions/branchActions';
import { ActionTypes } from '../../../../redux/constants/action-types';
import { EditBranchModal } from './EditBranchModal';

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
            <UserModal name={name} dateCreated={dateCreated} branch={branch} />
          </MenuItem>
          <MenuItem>
            {/* <FiEdit />
            <span style={{ marginLeft: '10px' }}>Edit</span> */}
            <EditBranchModal branch={branch} />
          </MenuItem>
          <MenuItem>
            <CautionAlertDialog
              icon={
                <Tooltip label='delete transaction' aria-label='A tooltip'>
                  <Text className='red small'>
                    <AiOutlineDelete />
                  </Text>
                </Tooltip>
              }
              cautionTitle='Are you sure you want to delete transaction?'
              noText={'No, Dont Deactivate'}
              yesText={'Yes, Delete Transaction'}
              mt='5px'
              small={true}
              onContinue={null}
            />
            <span style={{ marginLeft: '10px' }}>Deactivate</span>
            {/* <AiOutlineDelete />
            <span style={{ marginLeft: "10px" }}>Deactivate</span> */}
          </MenuItem>
          <MenuItem onClick={deleteBranch}>
            <FiTrash />
            <span style={{ marginLeft: '10px' }}>Delete</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

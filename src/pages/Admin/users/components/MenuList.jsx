import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { UserModal } from './UserModal';
import CautionAlertDialog from '../../../../components/CautionAlertDialog';
import { DisableUserAlert } from './DisableUserAlert';

export const MenuLItems = ({ data }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <UserModal data={data} />
          </MenuItem>
          <MenuItem>
            <FiEdit />
            <span style={{ marginLeft: '10px' }}>Edit</span>
          </MenuItem>
          <MenuItem>
            <DisableUserAlert user={data} mt='5px' small={true} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

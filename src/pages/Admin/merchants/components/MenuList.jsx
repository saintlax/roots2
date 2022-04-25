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
import { DeactivateMerchantAlert } from './DeactivateMerchantAlert';

export const MenuLItems = ({ merchant }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <UserModal merchant={merchant} />
          </MenuItem>
          {/* <MenuItem>
            <FiEdit />
            <span style={{ marginLeft: '10px' }}>Edit</span>
          </MenuItem> */}
          <MenuItem>
            <DeactivateMerchantAlert merchant={merchant} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

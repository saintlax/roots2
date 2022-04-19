import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit, FiCreditCard } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { UserModal } from './UserModal';
import CautionAlertDialog from '../../../../components/CautionAlertDialog';

export const MenuLItems = ({ name, data }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <UserModal name={name} loan={data} />
          </MenuItem>
          <MenuItem>
            <FiCreditCard />
            <span style={{ marginLeft: '10px' }}>Payments</span>
          </MenuItem>
          <MenuItem>
            <FiEdit />
            <span style={{ marginLeft: '10px' }}>Products</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

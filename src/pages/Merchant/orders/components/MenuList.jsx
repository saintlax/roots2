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
import { OrderDetailModal } from './OrderDetailModal';
import CautionAlertDialog from '../../../../components/CautionAlertDialog';

export const MenuLItems = ({ order }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <OrderDetailModal order={order} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

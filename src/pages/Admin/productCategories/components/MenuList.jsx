import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { DeleteBankAlert } from './DeleteBankAlert';

export const MenuLItems = ({ name, data }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <DeleteBankAlert bank={data} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { DeleteCategoryAlert } from './DeleteCategoryAlert';

export const MenuLItems = ({ name, data }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <DeleteCategoryAlert category={data} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

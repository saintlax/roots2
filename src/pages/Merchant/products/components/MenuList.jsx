import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
// import { UserModal } from './UserModal';
import { EditProductModal } from './EditProductModal';
import { DeleteProductAlert } from './DeleteProductAlert';
import { PlaceOrderModal } from './placeOrder';

export const MenuLItems = ({ product }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          {/* <MenuItem>
            <UserModal name={name} dateCreated={dateCreated} />
          </MenuItem> */}
          <MenuItem>
            <EditProductModal product={product} />
          </MenuItem>
          <MenuItem>
            <PlaceOrderModal product={product} />
          </MenuItem>
          <MenuItem>
            <DeleteProductAlert product={product} mt='5px' small={true} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

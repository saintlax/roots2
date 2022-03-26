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
import { EditProductModal } from './EditProductModal';

export const MenuLItems = ({ name, dateCreated, product }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={'pointer'} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <UserModal name={name} dateCreated={dateCreated} />
          </MenuItem>
          <MenuItem>
            <EditProductModal product={product} />
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
        </MenuList>
      </Menu>
    </>
  );
};

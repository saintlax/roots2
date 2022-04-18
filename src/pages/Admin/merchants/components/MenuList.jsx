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
          <MenuItem>
            <FiEdit />
            <span style={{ marginLeft: '10px' }}>Edit</span>
          </MenuItem>
          <MenuItem>
            <CautionAlertDialog
              icon={
                <Tooltip label='delete merchant' aria-label='A tooltip'>
                  <Text className='red small'>
                    <AiOutlineDelete />
                  </Text>
                </Tooltip>
              }
              cautionTitle='Are you sure you want to deactivate merchant?'
              noText={'No, Dont Deactivate'}
              yesText={'Yes, Deactivate Marchant'}
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

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi"
import { AiOutlineDelete } from "react-icons/ai"
import { UserModal } from "./UserModal";
import CautionAlertDialog from "../../../../components/CautionAlertDialog";


export const MenuLItems = ({ name, data }) => {
  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDots cursor={"pointer"} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <UserModal name={name} data={data} />
          </MenuItem>
          <MenuItem>
            <FiEdit />
            <span style={{ marginLeft: "10px" }}>Edit</span>
          </MenuItem>
          <MenuItem>
            <CautionAlertDialog
              icon={
                <Tooltip label="delete user" aria-label="A tooltip">
                  <Text className="red small">
                    <AiOutlineDelete />
                  </Text>
                </Tooltip>
              }
              noText="No, Dont Delete"
              yesText={"Yes, Delete User"}
              cautionTitle="Are you sure you want to delete user?"
              mt="5px"
              small={true}
              onContinue={null}
            />
            <span style={{ marginLeft: "10px" }}>Delete</span>
            {/* <AiOutlineDelete />
            <span style={{ marginLeft: "10px" }}>Delete</span> */}
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

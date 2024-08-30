import {
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  Text,
  Td,
  Tr,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <Tr>
      <Td textAlign="center">
        <Avatar name={`${user.firstName} ${user.lastName}`} size="sm" />
      </Td>
      <Td textAlign="center">
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
      </Td>
      <Td textAlign="center">
        <Text>{user.email}</Text>
      </Td>
      <Td textAlign="center">
        <Text>{user.department}</Text>
      </Td>
      <Td textAlign="center">
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            variant="ghost"
            aria-label="Options"
          />
          <MenuList>
            <MenuItem onClick={() => onEdit(user)}>Update</MenuItem>
            <MenuItem onClick={() => onDelete(user.id)}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

export default UserCard;

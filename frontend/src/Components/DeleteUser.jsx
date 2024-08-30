import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function DeleteUser({ isOpen, onClose, userId, onDeleteSuccess }) {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      toast({
        title: "User deleted.",
        description: "The user has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteSuccess(userId);
      onClose();
    } catch (error) {
      toast({
        title: "Error deleting user.",
        description: "An error occurred while trying to delete the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this user?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteUser;

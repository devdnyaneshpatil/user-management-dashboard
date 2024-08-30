import React, { useState } from "react";
import {
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";

function UpdateUser({ user, isOpen, onClose, onUpdateSuccess }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [department, setDepartment] = useState(user.department);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `http://localhost:3000/users/${user.id}`,
        {
          firstName,
          lastName,
          email,
          department,
        }
      );
      onUpdateSuccess(data);
      toast({
        title: "User updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error updating user", error);
      toast({
        title: "Error updating user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Department</FormLabel>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department"
              />
            </FormControl>

            <Button colorScheme="teal" onClick={handleUpdate} isLoading={isLoading}>
              Update User
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateUser;

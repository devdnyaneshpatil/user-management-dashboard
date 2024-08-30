// AddUser.jsx
import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";

function AddUser({ fetchUserData, isOpen, onClose, setCurrentPage }) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.department
    ) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://json-server-de5k.onrender.com/users",
        formData
      );
      toast({
        title: "User Added",
        description: "The user has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
      fetchUserData(1);
      setCurrentPage(1);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to add the user. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4} maxW="md" mx="auto">
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="first-name" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="last-name" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="department" isRequired>
                  <FormLabel>Department</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button colorScheme="teal" type="submit">
                  Add User
                </Button>
              </Stack>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddUser;

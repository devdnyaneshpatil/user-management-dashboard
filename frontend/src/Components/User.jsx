import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";
import UserCard from "./UserCard";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";

function User() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // State to handle delete functionality
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedUserId, setSelectedUserId] = useState(null);

  // State to handle update functionality
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUserData = async (page) => {
    setIsLoading(true);
    try {
      const { data, headers } = await axios.get(
        `https://json-server-de5k.onrender.com/users?_page=${page}&_limit=5`
      );
      //   setTotalPages(data.last);
      setTotalPages(Math.ceil(headers["x-total-count"] / 5));
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData(currentPage);
  }, [currentPage]);

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    onDeleteOpen();
  };

  const handleDeleteSuccess = (deletedUserId) => {
    setUserData(userData.filter((user) => user.id !== deletedUserId));
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateSuccess = (updatedUser) => {
    setUserData(
      userData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <>
      <Box
        w="100%"
        overflowX="auto"
        border="1px solid gray"
        borderRadius="md"
        p={4}
      >
        <Table variant="simple" size="sm" w="full">
          <Thead>
            <Tr>
              <Th textAlign="center">Profile</Th>
              <Th textAlign="center">Name</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">Department</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr>
                <Td colSpan="5" textAlign="center">
                  <Spinner size="lg" />
                </Td>
              </Tr>
            ) : (
              userData.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={() => handleEdit(user)}
                  onDelete={() => handleDelete(user.id)}
                />
              ))
            )}
          </Tbody>
        </Table>

        <Button
          position="fixed"
          bottom="100px"
          right="60px"
          colorScheme="teal"
          size="lg"
          borderRadius="full"
          onClick={onOpen}
        >
          <Icon as={AddIcon} />
        </Button>

        <AddUser
          isOpen={isOpen}
          onClose={onClose}
          fetchUserData={fetchUserData}
          setCurrentPage={setCurrentPage}
        />

        {/* Delete User Modal */}
        <DeleteUser
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          userId={selectedUserId}
          onDeleteSuccess={handleDeleteSuccess}
        />

        {/* Update User Modal */}
        {selectedUser && (
          <UpdateUser
            user={selectedUser}
            isOpen={Boolean(selectedUser)}
            onClose={() => setSelectedUser(null)}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
      </Box>

      <Box mt={4} textAlign="center">
        <HStack spacing={8} justify="center">
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="outline"
            isDisabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            isLoading={isLoading}
          >
            Previous
          </Button>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            isDisabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            isLoading={isLoading}
          >
            Next
          </Button>
        </HStack>
      </Box>
    </>
  );
}

export default User;

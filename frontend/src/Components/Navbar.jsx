import React from 'react';
import { Box, Flex, Avatar, Text } from '@chakra-ui/react';

function Navbar() {
  return (
    <Box bg="gray.100" px={10} py={2}>
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          User-dashboard
        </Text>
        <Avatar size="md" name="User Avatar" src="./avatar.png" />
      </Flex>
    </Box>
  );
}

export default Navbar;

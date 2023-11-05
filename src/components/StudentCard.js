import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  Spacer, // Import Spacer
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const StudentCard = ({ student, onDelete, onEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedName, setEditedName] = useState(student.name);
  const [editedEmail, setEditedEmail] = useState(student.email);
  const toast = useToast(); 

  const handleUpdateStudent = () => {
    onEdit(student.id, { name: editedName, email: editedEmail });
    onClose();
   
    toast({
      title: 'Student Updated',
      description: `Student ${student.name} updated successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <Heading as="h2" size="md">
        {student.name}
      </Heading>
      <Text>Email: {student.email}</Text>
      <Text>Dob: {student.dob}</Text>
      <Text>Age: {student.age}</Text>
      <Button colorScheme="red" size="sm" mt={2} mr={3} onClick={() => onDelete(student.id)}>
        Delete
      </Button>
      <Button colorScheme="teal" size="sm" mt={2} onClick={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </ModalBody>
          <Button colorScheme="teal" size="sm" onClick={handleUpdateStudent}>
            Save
          </Button>
        </ModalContent>
      </Modal>
      <Spacer /> 
    </Box>
  );
};

export default StudentCard;

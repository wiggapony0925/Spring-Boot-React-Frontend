import React, { useState, useEffect } from 'react';
import { Flex, Button, Heading, useDisclosure, Input, Modal,  
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from '@chakra-ui/react';
import StudentCard from './StudentCard';
import { useToast } from '@chakra-ui/react';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', dob: '' });
  const toast = useToast(); 

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:8080/api/v1/student') 
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => {
        console.error('Error:', error);
        // Display error toast
        toast({
          title: 'Error Fetching Students',
          description: 'An error occurred while fetching students.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleCreateStudent = () => {
    fetch('http://localhost:8080/api/v1/student', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then(() => {
        onClose();
        fetchStudents();
        // Display success toast
        toast({
          title: 'Student Created',
          description: 'Student added successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Display error toast
        toast({
          title: 'Error Creating Student',
          description: 'An error occurred while creating the student.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleDeleteStudent = (studentId) => {
    fetch(`http://localhost:8080/api/v1/student/${studentId}`, { 
      method: 'DELETE',
    })
      .then(() => {
        fetchStudents();
        // Display success toast
        toast({
          title: 'Student Deleted',
          description: 'Student deleted successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Display error toast
        toast({
          title: 'Error Deleting Student',
          description: 'An error occurred while deleting the student.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleEditStudent = (studentId, studentData) => {
    fetch(`http://localhost:8080/api/v1/student/${studentId}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    })
      .then(() => {
        fetchStudents();
        // Display success toast
        toast({
          title: 'Student Updated',
          description: 'Student updated successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Display error toast
        toast({
          title: 'Error Updating Student',
          description: 'An error occurred while updating the student.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex direction="column" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Student Dashboard
      </Heading>
      <Button colorScheme="teal" size="md" onClick={onOpen}>
        Add Student
      </Button>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onDelete={handleDeleteStudent}
          onEdit={handleEditStudent}
        />
      ))}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <ChakraInput
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <ChakraInput
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date of Birth</FormLabel>
              <ChakraInput
                type="date"
                placeholder="Date of Birth"
                value={newStudent.dob}
                onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" size="sm" onClick={handleCreateStudent}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Dashboard;

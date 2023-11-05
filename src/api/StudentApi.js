import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/student'; // Replace with your backend API URL

const studentsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  // Add any other headers you need, such as authentication tokens.
  },
});

export const getStudents = async () => {
  try {
    const response = await studentsApi.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const createStudent = async (student) => {
  try {
    const response = await studentsApi.post('/', student);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    await studentsApi.delete(`/${studentId}`);
  } catch (error) {
    console.error(`Error deleting student with ID ${studentId}:`, error);
    throw error;
  }
};

export const editStudent = async (studentId, studentData) => {
  try {
    await studentsApi.put(`/${studentId}`, studentData);
  } catch (error) {
    console.error(`Error editing student with ID ${studentId}:`, error);
    throw error;
  }
};

import React from 'react';
import { ChakraProvider, CSSReset, extendTheme, Box } from '@chakra-ui/react';
import Dashboard from './components/Dashboard';

const theme = extendTheme({
  // Your Chakra UI theme configurations
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={4}>
        <Dashboard />
      </Box>
    </ChakraProvider>
  );
}

export default App;

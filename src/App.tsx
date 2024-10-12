import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChakraProvider } from '@chakra-ui/react';  // Ensure ChakraProvider is imported

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ChakraProvider>  {/* Wrap the app in ChakraProvider */}
      <GoogleOAuthProvider clientId="167078774916-ktdd044k8l528goetmjc7pdaqkgrbranc.apps.googleusercontent.com">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </ChakraProvider>
  );
}

export default App;

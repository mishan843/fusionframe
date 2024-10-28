import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import './App.css';
import PrivateRoutes from './components/privateroute/PrivateRoute';
import LoginAd from './pages/Login';
import StyleTransferHome from './pages/Home/Home';
import { useState } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from 'react-hot-toast';

// Create theme or import it if you have a separate theme file
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',
    },
    background: {
      default: '#111827',
      paper: '#1F2937',
    },
  },
});

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <Routes>
            {/* Public Routes */}
            {/* <Route path="/login" element={<LoginAd />} /> */}
            
            {/* Protected Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<StyleTransferHome />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

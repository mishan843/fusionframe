import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import './App.css';
import PrivateRoutes from './components/privateroute/PrivateRoute';
import LoginAd from './pages/Login';
import StyleTransferHome from './pages/Home/Home';
import { useState } from 'react';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/login" element={<LoginAd />} /> */}
          
          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<StyleTransferHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
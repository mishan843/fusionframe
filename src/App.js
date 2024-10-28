import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import './App.css';
import PrivateRoutes from './components/privateroute/PrivateRoute';
// import SideBar from './components/sidebar/SideBar';
import LoginAd from './pages/Login';
import { useState } from 'react';
// import Dashboard from './pages/Dashboard';


function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<LoginAd />} /> */}
          <Route exec element={<PrivateRoutes />}>
              {/* <Route path="/" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
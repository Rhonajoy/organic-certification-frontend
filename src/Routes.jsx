import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Farmers from './components/farmer/FarmersList';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/farmers" element={<Farmers />} />
      
    </Routes>
  );
};

export default AppRoutes;
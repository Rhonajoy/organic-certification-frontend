import { Routes, Route,Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Farmers from "./components/farmer/FarmersList";
import Inspection from "./components/farmer/InspectionList";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ProtectedRoute from "./ProtectedRoute";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/farmers" element={<Farmers />} />
      <Route path="/inspections" element={<Inspection />} />
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Journal from "../pages/Journal";
import Students from "../pages/Students";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/RoleRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      {/* PROTECTED */}
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/journal"
        element={
          <ProtectedRoute>
            <Journal />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <Admin />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/context/Authcontext";

import Home from "./components/generic/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/Protectedroute";

// Manager Pages
import DeleteUserRequests from "./components/manager/managerUM/DelReq";
import ManagerUserManagement from "./components/manager/managerUM/ManagerUM";
import PendingUserApproval from "./components/manager/managerUM/pendingReqs";
import ManagerDashboard2 from "./components/manager/managerAM/MD";

// TODO: Admin / Member imports
// import AdminDashboard from "./components/admin/AdminDashboard";
// import MemberDashboard from "./components/member/MemberDashboard";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ------------------ Manager Routes ------------------ */}
          {user?.role === "manager" && (
            <>
              <Route
                path="/dashboard/am"
                element={
                  <ProtectedRoute>
                    <ManagerDashboard2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/um"
                element={
                  <ProtectedRoute>
                    <ManagerUserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/pua"
                element={
                  <ProtectedRoute>
                    <PendingUserApproval />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/udr"
                element={
                  <ProtectedRoute>
                    <DeleteUserRequests />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {/* ------------------ Admin Routes ------------------ */}
          {user?.role === "admin" && (
            <>
              {/* Add admin dashboard routes here */}
              <Route path="/dashboard/admin" element={<ProtectedRoute><div>Admin Dashboard</div></ProtectedRoute>} />
            </>
          )}

          {/* ------------------ Member Routes ------------------ */}
          {user?.role === "member" && (
            <>
              {/* Add member dashboard routes here */}
              <Route path="/dashboard/member" element={<ProtectedRoute><div>Member Dashboard</div></ProtectedRoute>} />
            </>
          )}

          {/* Fallback: redirect unknown paths */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

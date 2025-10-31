


// import { Suspense, lazy } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./components/context/Authcontext";
// import ProtectedRoute from "./components/Protectedroute";

// // 🧩 Lazy-loaded components
// const Header = lazy(() => import("./components/generic/Header"));
// const Home = lazy(() => import("./components/generic/Home"));
// const Login = lazy(() => import("./components/Login"));
// const Register = lazy(() => import("./components/Register"));

// // Admin pages
// const AdminDashboard = lazy(() => import("./components/admin/admin_M_AM/AD"));
// const AdminUserManagement = lazy(() =>
//   import("./components/admin/admin_M_UM/AdminUM")
// );
// const AdminDeleteUserRequests = lazy(() =>
//   import("./components/admin/admin_M_UM/DelReq")
// );
// const AdminPendingUserApproval = lazy(() =>
//   import("./components/admin/admin_M_UM/pendingReqs")
// );

// // Manager Pages
// const DeleteUserRequests = lazy(() =>
//   import("./components/manager/managerUM/DelReq")
// );
// const ManagerDashboard2 = lazy(() =>
//   import("./components/manager/managerAM/MD")
// );
// const ManagerUserManagement = lazy(() =>
//   import("./components/manager/managerUM/ManagerUM")
// );
// const PendingUserApproval = lazy(() =>
//   import("./components/manager/managerUM/pendingReqs")
// );

// // Member Pages
// const MemberPI = lazy(() => import("./components/member/MemberPI"));

// export default function App() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <AuthProvider>
//       <Router>
//         <Suspense
//           fallback={
//             <div
//               style={{
//                 height: "100vh",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 background: "#f7f7f7",
//               }}
//             >
//               <h2>Loading...</h2>
//             </div>
//           }
//         >
//           <Routes>
//             {/* ---------- Public Routes ---------- */}
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Header />
//                   <Home />
//                 </>
//               }
//             />
//             <Route
//               path="/login"
//               element={
//                 <>
//                   <Header />
//                   <Login />
//                 </>
//               }
//             />
//             <Route
//               path="/register"
//               element={
//                 <>
//                   <Header />
//                   <Register />
//                 </>
//               }
//             />

//             {/* ---------- Manager Routes ---------- */}
//             {user?.role === "manager" && (
//               <>
//                 <Route
//                   path="/dashboard/am"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <ManagerDashboard2 />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/um"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <ManagerUserManagement />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/pua"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <PendingUserApproval />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/udr"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <DeleteUserRequests />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//               </>
//             )}

//             {/* ---------- Admin Routes ---------- */}
//             {user?.role === "admin" && (
//               <>
//                 <Route
//                   path="/dashboard/am"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <AdminDashboard />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/um"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <AdminUserManagement />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/pua"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <AdminPendingUserApproval />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//                 <Route
//                   path="/dashboard/udr"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <AdminDeleteUserRequests />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//               </>
//             )}

//             {/* ---------- Member Routes ---------- */}
//             {user?.role === "member" && (
//               <>
              
//                 <Route
//                   path="/dashboard/pi"
//                   element={
//                     <>
//                       <ProtectedRoute>
//                                               <Header />

//                         <MemberPI />
//                       </ProtectedRoute>
//                     </>
//                   }
//                 />
//               </>
//             )}

//             {/* ---------- Fallback ---------- */}
//             <Route
//               path="*"
//               element={
//                 <>
//                   <Header />
//                   <Home />
//                 </>
//               }
//             />
//           </Routes>
//         </Suspense>
//       </Router>
//     </AuthProvider>
//   );
// }





import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/context/Authcontext";
import ProtectedRoute from "./components/Protectedroute";

// 🧩 Lazy-loaded components
const Header = lazy(() => import("./components/generic/Header"));
const Home = lazy(() => import("./components/generic/Home"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

// Admin pages
const AdminDashboard = lazy(() => import("./components/admin/admin_M_AM/AD"));
const AdminUserManagement = lazy(() => import("./components/admin/admin_M_UM/AdminUM"));
const AdminDeleteUserRequests = lazy(() => import("./components/admin/admin_M_UM/DelReq"));
const AdminPendingUserApproval = lazy(() => import("./components/admin/admin_M_UM/pendingReqs"));

// Manager Pages
const DeleteUserRequests = lazy(() => import("./components/manager/managerUM/DelReq"));
const ManagerDashboard2 = lazy(() => import("./components/manager/managerAM/MD"));
const ManagerUserManagement = lazy(() => import("./components/manager/managerUM/ManagerUM"));
const PendingUserApproval = lazy(() => import("./components/manager/managerUM/pendingReqs"));

// Member Pages
const MemberPI = lazy(() => import("./components/member/MemberPI"));

// 🔹 Inner Routes component (so AuthContext is accessible here)
function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      {/* Header shown on all pages */}
      <Header />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/dashboard/am"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/um"
          element={
            <ProtectedRoute role="admin">
              <AdminUserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/pua"
          element={
            <ProtectedRoute role="admin">
              <AdminPendingUserApproval />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/udr"
          element={
            <ProtectedRoute role="admin">
              <AdminDeleteUserRequests />
            </ProtectedRoute>
          }
        />

        {/* Manager Routes */}
        <Route
          path="/manager/dashboard/am"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/dashboard/um"
          element={
            <ProtectedRoute role="manager">
              <ManagerUserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/dashboard/pua"
          element={
            <ProtectedRoute role="manager">
              <PendingUserApproval />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/dashboard/udr"
          element={
            <ProtectedRoute role="manager">
              <DeleteUserRequests />
            </ProtectedRoute>
          }
        />

        {/* Member Route */}
        <Route
          path="/dashboard/pi"
          element={
            <ProtectedRoute role="member">
              <MemberPI />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f7f7f7",
              }}
            >
              <h2>Loading...</h2>
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

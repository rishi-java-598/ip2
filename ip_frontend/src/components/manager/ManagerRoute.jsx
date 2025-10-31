// src/components/ManagerRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/Authcontext";

// export default function ManagerRoute({ children }) {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;

//   if (user.role !== "manager") {
//     return <Navigate to="/" replace />; // redirect non-managers
//   }

//   return children;
// }

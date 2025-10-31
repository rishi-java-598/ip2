// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../components/context/Authcontext";

// export default function ProtectedRoute({ children }) {
//       const user = localStorage.getItem("user");
//       // const {user} = useAuth();
//       // console.log(user);
      

  
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// }



// part 2
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./context/Authcontext";

// export default function ProtectedRoute({ children }) {
//   const { user } = useAuth(); // use context, not localStorage

//   if (!user) return <Navigate to="/home" replace />;
//   return children;
// }

// src/components/Protectedroute.jsx




// import { Navigate } from "react-router-dom";
// import { useAuth } from "./context/Authcontext";

// export default function ProtectedRoute({ children, role }) {
//   const { user } = useAuth();

//   // If not logged in → go to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // If role required but doesn't match → go to home
//   if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
//     return <Navigate to="/" replace />;
//   }

//   // ✅ Otherwise render the component
//   return children;
// }



import { Navigate } from "react-router-dom";
import { useAuth } from "./context/Authcontext";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role?.toLowerCase() !== role.toLowerCase()) {
   

    
    return <Navigate to="/" replace />;
  }

  return children;
}


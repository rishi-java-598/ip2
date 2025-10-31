// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
      
// //     </>
// //   )
// // }

// // export default App
// import React, { useState } from "react";
// import Navbar from "./components/shared/Navbar";
// import Sidebar from "./components/shared/Sidebar";
// import ProtectedRoute from "./components/shared/ProtectedRoute";
// import StatsCard from "./components/shared/StatsCard";
// import AttendanceTable from "./components/shared/AttendanceTable";
// import UserCard from "./components/shared/UserCard";
// import FilterBar from "./components/shared/FilterBar";
// import ExportButton from "./components/shared/ExportButton";
// import ConfirmDialog from "./components/shared/ConfirmDialog";
// import "./App.css"; // just for global styles

// export default function App() {
//   const [role] = useState("manager"); // change to "admin" or "member" to see role-based UI
//   const [showConfirm, setShowConfirm] = useState(false);

//   const demoLinks = ["Dashboard", "Users", "Attendance", "Settings"];

//   const demoStats = [
//     { title: "Total Members", value: 120 },
//     { title: "Active Memberships", value: 95 },
//     { title: "Today's Attendance", value: 65 },
//   ];

//   const demoAttendance = [
//     { memberName: "John Doe", slot: "Morning", date: "2025-09-08" },
//     { memberName: "Jane Smith", slot: "Evening", date: "2025-09-08" },
//   ];

//   const demoUser = {
//     name: "Michael Johnson",
//     email: "michael@example.com",
//     membershipType: "Gold",
//   };

//   const demoFilters = [
//     { key: "slot", label: "Slot", options: ["Morning", "Evening", "Full Day"] },
//     { key: "status", label: "Status", options: ["Active", "Inactive"] },
//   ];

//   return (
//     <div className="app-container">
//       <Navbar role={role} />
//       <div className="main-layout">
//         <Sidebar links={demoLinks} />
//         <div className="content">
//           {/* Protected Route Example */}
//           <ProtectedRoute role={role} allowedRoles={["admin", "manager"]}>
//             <h2>Dashboard</h2>
//             <div className="stats-grid">
//               {demoStats.map((s, idx) => (
//                 <StatsCard key={idx} title={s.title} value={s.value} />
//               ))}
//             </div>

//             {/* Filter Bar + Export Button */}
//             <div className="actions-row">
//               <FilterBar
//                 filters={demoFilters}
//                 onChange={(key, value) =>
//                   console.log(`Filter changed: ${key} = ${value}`)
//                 }
//               />
//               <ExportButton onExport={() => console.log("Export clicked")} />
//             </div>

//             {/* Attendance Table */}
//             <AttendanceTable data={demoAttendance} />

//             {/* User Card */}
//             <h3>Example User</h3>
//             <UserCard user={demoUser} />

//             {/* Confirm Dialog */}
//             <button onClick={() => setShowConfirm(true)}>Show Confirm</button>
//             {showConfirm && (
//               <ConfirmDialog
//                 message="Are you sure you want to delete this user?"
//                 onConfirm={() => {
//                   console.log("Confirmed!");
//                   setShowConfirm(false);
//                 }}
//                 onCancel={() => setShowConfirm(false)}
//               />
//             )}
//           </ProtectedRoute>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import "./App.css";

// User components
import UserDashboard from "./components/user/UserDashboard";
import ProfilePage from "./components/user/ProfilePage";
import MembershipDetails from "./components/user/MembershipDetails";
import AttendanceHistory from "./components/user/AttendanceHistory";
import RegistrationForm from "./components/user/RegistrationForm";

// Shared components (optional preview)
import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/shared/Sidebar";

export default function App() {
  const userRole = "member"; // change to see Navbar role change
  const sidebarLinks = ["Dashboard", "Profile", "Membership", "Attendance", "Register"];

  return (
    <div className="app-container">
      <Navbar role={userRole} />
      <div className="main-layout">
        <Sidebar links={sidebarLinks} />
        <div className="content">
          <h1>👤 Member Portal Preview</h1>

          <section>
            <UserDashboard />
          </section>

          <section>
            <ProfilePage />
          </section>

          <section>
            <MembershipDetails />
          </section>

          <section>
            <AttendanceHistory />
          </section>

          <section>
            <RegistrationForm />
          </section>
        </div>
      </div>
    </div>
  );
}

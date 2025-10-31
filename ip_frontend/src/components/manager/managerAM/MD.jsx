// import  { useState } from 'react';
// import styles from './style.module.css';
// // import './style.module.css';
// import MarkAttendance from './MarkAttendance';
// import UserList from './UserList';
// import AttendanceSummary from './AttendanceSummary';
// import PreviousAttendance from './PrevAttendance';
// import DashNav from './DashNav';
// import DashNav2 from './DashNav2';
// const ManagerDashboard2 = () => {
//   const [active, setActive] = useState('mark');

//   return (
    
//     <div className={styles.container}>

//       <aside className={styles.sidebar}>
//         <h2 className={styles.logo}>Menu</h2>
//         <nav>
//           <button className={active==='mark'?styles.active:''} onClick={()=>setActive('mark')}>Mark Today's Attendance</button>
//           <button className={active==='users'?styles.active:''} onClick={()=>setActive('users')}>Get Users Attendance</button>
//           <button className={active==='summary'?styles.active:''} onClick={()=>setActive('summary')}>Attendance Summary By Date</button>
//           <button className={active==='previous'?styles.active:''} onClick={()=>setActive('previous')}>Previous Attendance</button>
//         </nav>
        
//       </aside>




//       <main className={styles.main}>
//                     <h1 className={styles.mdHead}> Manager Dashboard</h1>


//         {/* <nav className={styles.uppernav}>
       
//     <DashNav active={active} setActive={setActive}/>
    
//       </nav> */}

//          <nav className={styles.uppernav}>
//         {/* <button className={active==='mark'?styles.active:''} onClick={()=>setActive('mark')} title="Mark Today's Attendance">Mark Attendance</button>
//           <button className={active==='users'?styles.active:''} onClick={()=>setActive('users')} title='Get Users Attendance'>Get Attendance</button>
//           <button className={active==='summary'?styles.active:''} onClick={()=>setActive('summary')} title='Attendance Summary By Date'>Attendance Summary</button>
//           <button className={active==='previous'?styles.active:''} onClick={()=>setActive('previous')} title='Previous Attendance'>Previous Attendance</button>
//      */}
//     <DashNav2 active={active} setActive={setActive}/>
    
//       </nav>
      
//         {active === 'mark' && <MarkAttendance />}
//         {active === 'users' && <UserList />}
//         {active === 'summary' && <AttendanceSummary />}
//         {active === 'previous' && <PreviousAttendance />}
//       </main>
//     </div>
//   );
// };

// export default ManagerDashboard2;





import  { useState, lazy, Suspense } from "react";
import styles from "./style.module.css";

// 🧩 Lazy-loaded subcomponents (code splitting)
const MarkAttendance = lazy(() => import("./MarkAttendance"));
const UserList = lazy(() => import("./UserList"));
const AttendanceSummary = lazy(() => import("./AttendanceSummary"));
const PreviousAttendance = lazy(() => import("./PrevAttendance"));
const DashNav2 = lazy(() => import("./DashNav2"));

export default function ManagerDashboard2() {
  const [active, setActive] = useState("mark");

  // A simple shared fallback loader
  const Loader = (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontSize: "1.2rem",
        color: "#555",
      }}
    >
      Loading section...
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>Menu</h2>
        <nav>
          <button
            className={active === "mark" ? styles.active : ""}
            onClick={() => setActive("mark")}
          >
            Mark Today's Attendance
          </button>
          <button
            className={active === "users" ? styles.active : ""}
            onClick={() => setActive("users")}
          >
            Get Users Attendance
          </button>
          <button
            className={active === "summary" ? styles.active : ""}
            onClick={() => setActive("summary")}
          >
            Attendance Summary By Date
          </button>
          <button
            className={active === "previous" ? styles.active : ""}
            onClick={() => setActive("previous")}
          >
            Previous Attendance
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <h1 className={styles.mdHead}>Manager Dashboard</h1>

        {/* Upper Navigation */}
        <nav className={styles.uppernav}>
          <Suspense fallback={Loader}>
            <DashNav2 active={active} setActive={setActive} />
          </Suspense>
        </nav>

        {/* Dynamic sections */}
        <Suspense fallback={Loader}>
          {active === "mark" && <MarkAttendance />}
          {active === "users" && <UserList />}
          {active === "summary" && <AttendanceSummary />}
          {active === "previous" && <PreviousAttendance />}
        </Suspense>
      </main>
    </div>
  );
}

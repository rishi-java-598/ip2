
import  { useState, lazy, Suspense } from "react";
import styles from "./style.module.css";

// 🧩 Lazy-loaded subcomponents (code splitting)
const MarkAttendance = lazy(() => import("./MarkAttendance"));
const UserList = lazy(() => import("./UserList"));
const AttendanceSummary = lazy(() => import("./AttendanceSummary"));
const PreviousAttendance = lazy(() => import("./PrevAttendance"));
const DashNav2 = lazy(() => import("./DashNav2"));

export default function AdminAM() {
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
        <h1 className={styles.mdHead}>Admin Dashboard</h1>

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

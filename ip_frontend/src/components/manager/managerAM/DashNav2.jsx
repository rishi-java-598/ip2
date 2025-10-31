import React from "react";
import styles from "./DashNav2.module.css";

const DashNav2 = ({ active, setActive }) => {
  return (
    <div className={styles.navbar}>
      <button
        className={`${styles.navItem} ${active === "mark" ? styles.active : ""}`}
        onClick={() => setActive("mark")}
        title="Mark Today's Attendance"
      >
        Mark Attendance
      </button>

      <button
        className={`${styles.navItem} ${active === "users" ? styles.active : ""}`}
        onClick={() => setActive("users")}
        title="Get Users Attendance"
      >
        Get Attendance
      </button>

      <button
        className={`${styles.navItem} ${active === "summary" ? styles.active : ""}`}
        onClick={() => setActive("summary")}
        title="Attendance Summary By Date"
      >
        Attendance Summary
      </button>

      <button
        className={`${styles.navItem} ${active === "previous" ? styles.active : ""}`}
        onClick={() => setActive("previous")}
        title="Previous Attendance"
      >
        Previous Attendance
      </button>
    </div>
  );
};

export default DashNav2;

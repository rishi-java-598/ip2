// components/shared/Navbar.jsx
import React from "react";
import styles from "../../styles/shared/Navbar.module.css";

const Navbar = ({ role }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🏋️ GymPro</div>
      <ul className={styles.navLinks}>
        {role === "admin" && <li>Admin Dashboard</li>}
        {role === "manager" && <li>Manager Dashboard</li>}
        {role === "member" && <li>My Dashboard</li>}
        <li>Profile</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;

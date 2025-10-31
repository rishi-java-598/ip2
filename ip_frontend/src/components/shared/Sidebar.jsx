// components/shared/Sidebar.jsx
import React from "react";
import styles from "../../styles/shared/Sidebar.module.css";

const Sidebar = ({ links }) => {
  return (
    <aside className={styles.sidebar}>
      <ul>
        {links.map((link, idx) => (
          <li key={idx}>{link}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

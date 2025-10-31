// import React from "react";
// import { AiOutlineHome } from "react-icons/ai";
// import { FiMessageCircle, FiUser, FiSettings } from "react-icons/fi";
// import styles from "./DashNav.module.css";

// const navItems = [
//   { label: "Home", icon: <AiOutlineHome size={20} /> },
//   { label: "Messages", icon: <FiMessageCircle size={20} /> },
//   { label: "User", icon: <FiUser size={20} /> },
//   { label: "Settings", icon: <FiSettings size={20} /> },
// ];

// const DashNav = () => {
//   return (
//     <div className={styles.navbar}>
//       {navItems.map((item, index) => (
//         <div className={styles.navItem} key={index}>
//           <div className={styles.iconBox}>{item.icon}</div>
//           <span className={styles.tooltip}>{item.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DashNav;
// import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiMessageCircle, FiUser, FiSettings } from "react-icons/fi";
import styles from "./DashNav.module.css";

const navItems = [
  { id: "mark", label: "Mark Attendance", title: "Mark Today's Attendance", icon: <AiOutlineHome size={20} /> },
  { id: "users", label: "Get Attendance", title: "Get Users Attendance", icon: <FiMessageCircle size={20} /> },
  { id: "summary", label: "Attendance Summary", title: "Attendance Summary By Date", icon: <FiUser size={20} /> },
  { id: "previous", label: "Previous Attendance", title: "Previous Attendance", icon: <FiSettings size={20} /> },
];

const DashNav = ({ active, setActive }) => {
  return (
    <div className={styles.navbar}>
      {navItems.map((item) => (
        <button
          key={item.id}
          id={styles.dnBTN}
          className={`${styles.navItem} ${active === item.id ? styles.active : ""}`}
          onClick={() => setActive(item.id)}
          title={item.title}
        >
          <div className={styles.iconBox}>{item.icon}</div>
          <span className={styles.tooltip}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default DashNav;

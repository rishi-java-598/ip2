import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

export default function Navs() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">🏋️‍♂️ FitZone</Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {(user?.role === "admin" || user?.role === "manager") && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>

            <li
              className={styles.dropdown}
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <button className={styles.dropBtn}>
                Dashboard <span className={styles.arrow}>▼</span>
              </button>
              {dropdownOpen && (
                <div className={styles.dropdownContent}>
                  <Link to="/dashboard/am">Account Management</Link>
                  <Link to="/dashboard/um">User Management</Link>
                  <Link to="/dashboard/pua">Pending Approvals</Link>
                  <Link to="/dashboard/udr">Delete Requests</Link>
                </div>
              )}
            </li>
          </>
        )}

        {user?.role === "member" && (
          <li>
            <Link to="/dashboard/pi">Dashboard</Link>
          </li>
        )}

        {user && (
          <li>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

// import styles from "../../styles/generic/generic.module.css";
// import { Link } from "react-router-dom";
// import pic from "../../assets/Logo.png";
// import { useAuth } from "../context/Authcontext";
// import HamMenu from "./HamMenu";
// import Navs from "./Navs";
// export default function Header() {
//   const {user,logout} = useAuth();
//   return (
//     <>
//     <nav className={styles.nav}>
//         <div className={styles.lnc}>

//              <img src={pic} alt="Logo" />
//              <h1 className={styles.logoText}>THE IRON <br /> PARADISE</h1>
//         </div>



     
//       <div className={styles.rnc}>
//          {user?
//         <button className={styles.signupBtn}   onClick={logout}>Log out</button> 
//         :<Link className={styles.signupBtn} 
//         // id={styles.moveLink}
//          to="/login">LOG IN</Link>
//          }
//         <HamMenu/>

     
//         </div>

//     </nav>

//               <Navs/>

//     </>
//   );
// }


import styles from "../../styles/generic/generic2.module.css";
import { Link } from "react-router-dom";
import pic from "../../assets/Logo.png";
import { useAuth } from "../context/Authcontext";
import HamMenu from "./HamMenu";
import Navs from "./Navs";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <nav className={styles.nav}>
        {/* Left section - Logo */}
        <div className={styles.lnc}>
          <img src={pic} alt="Logo" />
          <h1 className={styles.logoText}>
            THE IRON <br /> PARADISE
          </h1>
    

            <div 
             style={{
    borderLeft: "2px solid black",
    paddingLeft: "20px",

  }}
            
            className={styles.centerNav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>

          {/* Show Register only for non-logged users or admins/managers */}
          { (
            <Link to="/register" className={styles.navLink}>
              Register new user
            </Link>
          )}

          {(user?.role === "admin" ) && (
            <div className={styles.dropdown}>
              <button className={styles.dropBtn}
              onClick={() => setShowDropdown(!showDropdown)}>


   Dashboard{" "}
        <span
          // className={styles.arrow}
          style={{
            display: "inline-block",
            fontSize: "10px",
            transition: "transform 0.3s ease",
            transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
          
                
              </button>
              <div 
              className={styles.dropdownContent}
              style={{display: showDropdown ? 'flex' : 'none'}}
              >
                <Link to="/dashboard/am">Attendance Management</Link>
                <Link to="/dashboard/um">User Management</Link>
                <Link to="/dashboard/pua">Pending Approvals</Link>
                <Link to="/dashboard/udr">Delete Requests</Link>
              </div>
            </div>
          )}


           {(user?.role === "manager") && (
            <div className={styles.dropdown}>
              <button className={styles.dropBtn}
              onClick={() => setShowDropdown(!showDropdown)}>


   Dashboard{" "}
        <span
          // className={styles.arrow}
          style={{
            display: "inline-block",
            fontSize: "10px",
            transition: "transform 0.3s ease",
            transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
          
                
              </button>
              <div 
              className={styles.dropdownContent}
              style={{display: showDropdown ? 'flex' : 'none'}}
              >
                <Link to="/manager/dashboard/am">Attendance Management</Link>
                <Link to="/manager/dashboard/um">User Management</Link>
                <Link to="/manager/dashboard/pua">Pendngi Approvals</Link>
                <Link to="/manager/dashboard/udr">Delete Requests</Link>
              </div>
            </div>
          )}

          {user?.role === "member" && (
            <Link to="/dashboard/pi" className={styles.navLink}>
              Dashboard
            </Link>
          )}
        </div>

        </div>

        {/* Center section - Navigation links */}
      

        {/* Right section - Auth buttons and menu */}
        <div className={styles.rnc}>
          {user ? (
            <button className={styles.signupBtn} onClick={logout}>
              Log out
            </button>
          ) : (
            <Link className={styles.signupBtn} to="/login">
              LOG IN
            </Link>
          )}
          <HamMenu />
        </div>
      </nav>

      {/* <Navs /> */}
    </>
  );
}
// import React from 'react';
// import styles from '../styles/generic/Login.module.css';

// const Login = () => {
//   return (
//     <div id="main" className={styles.container}>
//       <div id="left" className={styles.left}>
//         <div className={styles.loginContainer}>

//           <form className={styles.loginBox}>
//                                 <h1 id='loghead'>Login</h1>

//             <label htmlFor="email">Email</label>
//             <div className={styles.inputGroup}>
//               <span className={styles.icon}>@</span>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter your Email"
//                 required
//               />
//             </div>

//             <label htmlFor="password">Password</label>
//             <div className={styles.inputGroup}>
//               <span className={styles.icon}>🔒</span>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter your Password"
//                 required
//               />
//             </div>

//             <div className={styles.options}>
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>

//             <button type="submit" className={styles.btn}>
//               Sign In
//             </button>

//             <p className={styles.signupText}>
//               Don't have an account? <a href="#">Sign Up</a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;




// import React, { use, useState } from "react";
// import styles from "../styles/generic/Login.module.css";
// import { useAuth } from "../components/context/Authcontext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const { login } = useAuth();
//   const a = useAuth();
//   console.log(a);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         return;
//       }

//       // ✅ Save user + token in context + localStorage
//       login(data.user, data.token);

//       // Redirect to dashboard
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div id="main" className={styles.container}>
//       <div id="left" className={styles.left}>
//         <div className={styles.loginContainer}>
//           <form className={styles.loginBox} onSubmit={handleSubmit}>
//             <h1 id="loghead">Login</h1>

//             {error && <p style={{ color: "red" }}>{error}</p>}

//             <label htmlFor="email">Email</label>
//             <div className={styles.inputGroup}>
//               <span className={styles.icon}>@</span>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <label htmlFor="password">Password</label>
//             <div className={styles.inputGroup}>
//               <span className={styles.icon}>🔒</span>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div className={styles.options}>
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>

//             <button type="submit" className={styles.btn}>
//               Sign In
//             </button>

//             <p className={styles.signupText}>
//               Don't have an account? <a href="/register">Sign Up</a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// src/pages/Login.jsx
// import React, { useState } from "react";
// import styles from "../styles/generic/Login.module.css";
// import { useAuth } from "../components/context/Authcontext";
// import { useNavigate, Navigate, Link } from "react-router-dom";

// const Login = () => {
//   const { user, login,logout } = useAuth();
//   const navigate = useNavigate();
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   // ✅ If user already logged in → block this page
//   if (user) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <div className={styles.AlreadyLoggedIn} >
//           <h2>You are already logged in ✅</h2>
//           <button style={{marginTop:"20px"}} className={styles.btn} onClick={() => navigate("/dashboard")}>
//             Go to Dashboard
//           </button>
//           <button style={{marginTop:"20px"}} className={styles.btn} onClick={() => logout()}>
//             sign out
//           </button>
//         </div>
//       </div>
//     );
//   }


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         return;
//       }

//       // ✅ Save user + token in context + localStorage
//       login(data.user, data.token);

//       // Redirect to dashboard
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div id="main" className={styles.container}>
//       <div id="left" className={styles.left}>
//         <div className={styles.loginContainer}>
//           <form className={styles.loginBox} onSubmit={handleSubmit}>
//             <h1 id="loghead">Login</h1>

//             {error && <p style={{ color: "red" }}>{error}</p>}

//             <label htmlFor="email">Email</label>
//             <div className={styles.inputGroup}>
//               <span className={styles.icon}>@</span>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <label htmlFor="password">Password</label>
//             <div className={styles.inputGroup}>
//               <span className={styles.icon}>🔒</span>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div className={styles.options}>
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>

//             <button type="submit" className={styles.btn}>
//               Sign In
//             </button>

//             <p className={styles.signupText}>
//               Don't have an account? <Link to="/register">Register</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import styles from "../styles/generic/Login.module.css";
import '../styles/generic/Register.module.css'
import React, { useState } from "react";
import { useAuth } from "../components/context/Authcontext";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ✅ Yup schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // ✅ If user already logged in → block this page
  if (user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className={styles.AlreadyLoggedIn}>
          <h2>You are already logged in ✅</h2>
          <button
            style={{ marginTop: "20px" }}
            className={styles.btn}
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
          <button
            style={{ marginTop: "20px" }}
            className={styles.btn}
            onClick={() => logout()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save user + token in context + localStorage
      login(data.user, data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="main" className={styles.container}>
      <div id="left" className={styles.left}>
        <div className={styles.loginContainer}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={styles.loginBox}>
                <h1 id="loghead">Login</h1>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <label htmlFor="email">Email</label>
                <div className={styles.inputGroup}>
                  <span className={styles.icon}>@</span>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                    disabled={isSubmitting}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{ color: "red", fontSize: "0.85rem" }}
                />

                <label htmlFor="password">Password</label>
                <div className={styles.inputGroup}>
                  <span className={styles.icon}>🔒</span>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    disabled={isSubmitting}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red", fontSize: "0.85rem" }}
                />

                <div className={styles.options}>
                  <label>
                    <input type="checkbox" disabled={isSubmitting} /> Remember me
                  </label>
                  <a href="#">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className={isSubmitting?styles.disabledBtn:styles.btn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>

                <p className={styles.signupText}>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;

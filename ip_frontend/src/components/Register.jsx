// import React, { useState } from "react";
// import styles from "../styles/generic/Register.module.css";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     uniqueIdCard: "",
//     role: "member",
//     status: "pending",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted data:", formData);
//     // here you can send formData to your backend
//   };

//   return (
//     <div id="main" className={styles.container}>
//       <div id="left-side" className={styles.leftSide}>
//         <div className={styles.registerContainer}>
//           <div className={styles.registerBox}>
//             <h2 className={styles.title}>
//               <span className={styles.icon}></span>
//               Register
//             </h2>
//             <p className={styles.subtitle}>
//               Signup now and get full access to our app.
//             </p>

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="uniqueIdCard"
//                 placeholder="Unique ID Card"
//                 value={formData.uniqueIdCard}
//                 onChange={handleChange}
//                 required
//               />

//               {/* Hidden fields */}
//               <input type="hidden" name="role" value={formData.role} />
//               <input type="hidden" name="status" value={formData.status} />

//               <button type="submit">Submit</button>
//             </form>

//             <p className={styles.signinText}>
//               Already have an account? <Link to="/login">Signin</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import styles from "../styles/generic/Register.module.css";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "member",   // backend expects "member"
//     status: "pending" // default until admin approves
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false); // ✅ new state
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true); // ✅ start loading

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Registration failed");
//         return;
//       }

//       setSuccess(data.message);

//       // ✅ redirect to login after success
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       console.error("Registration error:", err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false); // ✅ stop loading
//     }
//   };

//   return (
//     <div id="main" className={styles.container}>
//       <div id="left-side" className={styles.leftSide}>
//         <div className={styles.registerContainer}>
//           <div className={styles.registerBox}>
//             <h2 className={styles.title}>Register</h2>
//             <p className={styles.subtitle}>
//               Signup now and get full access to our app.
//             </p>

//             {error && <p style={{ margin: "5px 0px", color: "red" }}>{error}</p>}
//             {success && (
//               <p style={{ margin: "5px 0px", color: "green" }}>{success}</p>
//             )}

//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />

//               {/* Hidden fields for role and status */}
//               <input type="hidden" name="role" value={formData.role} />
//               <input type="hidden" name="status" value={formData.status} />

//               <button className={loading?styles.disabled:styles.rgstrBTN} type="submit" disabled={loading}>
//                 {loading ? "Signing up..." : "Submit"}
//               </button>
//             </form>

//             <p className={styles.signinText}>
//               Already have an account? <Link to="/login">Signin</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;













//part2
// import React, { useState } from "react";
// import styles from "../styles/generic/Register.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const Register = () => {
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Validation schema with Yup
//   const validationSchema = Yup.object({
//     name: Yup.string().required("Full name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     phone: Yup.string()
//       .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
//       .required("Phone number is required"),
//   });

//   // ✅ Formik setup
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       phone: "",
//       role: "member",
//       status: "pending",
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       setError("");
//       setSuccess("");
//       setLoading(true);

//       try {
//         const res = await fetch("http://localhost:3000/api/auth/register", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(values),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           setError(data.message || "Registration failed");
//           return;
//         }

//         setSuccess(data.message);

//         // redirect to login after success
//         setTimeout(() => navigate("/login"), 2000);
//       } catch (err) {
//         console.error("Registration error:", err);
//         setError("Something went wrong. Try again.");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <div id="main" className={styles.container}>
//       <div id="left-side" className={styles.leftSide}>
//         <div className={styles.registerContainer}>
//           <div className={styles.registerBox}>
//             <h2 className={styles.title}>Register</h2>
//             <p className={styles.subtitle}>
//               Signup now and get full access to our app.
//             </p>

//             {error && <p style={{ margin: "5px 0px", color: "red" }}>{error}</p>}
//             {success && (
//               <p style={{ margin: "5px 0px", color: "green" }}>{success}</p>
//             )}

//             <form onSubmit={formik.handleSubmit}>
//               {/* Name */}
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.name && formik.errors.name && (
//                 <small style={{ color: "red", fontSize: "14px" }}>
//                   {formik.errors.name}
//                 </small>
//               )}

//               {/* Email */}
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.email && formik.errors.email && (
//                 <small style={{ color: "red", fontSize: "14px" }}>
//                   {formik.errors.email}
//                 </small>
//               )}

//               {/* Password */}
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.password && formik.errors.password && (
//                 <small style={{ color: "red", fontSize: "14px" }}>
//                   {formik.errors.password}
//                 </small>
//               )}

//               {/* Phone */}
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone (10 digits)"
//                 value={formik.values.phone}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.phone && formik.errors.phone && (
//                 <small style={{ color: "red", fontSize: "14px" }}>
//                   {formik.errors.phone}
//                 </small>
//               )}

//               {/* Hidden fields */}
//               <input type="hidden" name="role" value={formik.values.role} />
//               <input type="hidden" name="status" value={formik.values.status} />

//               <button
//                 className={loading ? styles.disabled : styles.rgstrBTN}
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? "Signing up..." : "Submit"}
//               </button>
//             </form>

//             <p className={styles.signinText}>
//               Already have an account? <Link to="/login">Signin</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


//part3
import React, { useState } from "react";
import styles from "../styles/generic/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone number is required"),
    Gender: Yup.string().required("Gender is required"), // ✅ fixed casing
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      Gender: "", // ✅ fixed casing
      role: "member",
      status: "pending",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError("");
      setSuccess("");
      setLoading(true);

      try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Registration failed");
          return;
        }

        setSuccess(data.message);

        // redirect to login after success
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        console.error("Registration error:", err);
        setError("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div id="main" className={styles.container}>
      <div id="left-side" className={styles.leftSide}>
        <div className={styles.registerContainer}>
          <div className={styles.registerBox}>
            <h2 className={styles.title}>Register</h2>
            <p className={styles.subtitle}>
              Signup now and get full access to our app.
            </p>

            {error && <p style={{ margin: "5px 0px", color: "red" }}>{error}</p>}
            {success && (
              <p style={{ margin: "5px 0px", color: "green" }}>{success}</p>
            )}

            <form onSubmit={formik.handleSubmit}>
              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <small style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.name}
                </small>
              )}

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <small style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.email}
                </small>
              )}

              {/* Password */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <small style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.password}
                </small>
              )}

              {/* Phone */}
              <input
                type="text"
                name="phone"
                placeholder="Phone (10 digits)"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <small style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.phone}
                </small>
              )}

              {/* Gender */}
              <select
                name="Gender" // ✅ fixed casing
                value={formik.values.Gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.Gender && formik.errors.Gender && (
                <small style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.Gender}
                </small>
              )}

              {/* Hidden fields */}
              <input type="hidden" name="role" value={formik.values.role} />
              <input type="hidden" name="status" value={formik.values.status} />

              <button
                className={loading ? styles.disabled : styles.rgstrBTN}
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Submit"}
              </button>
            </form>

            <p className={styles.signinText}>
              Already have an account? <Link to="/login">Signin</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

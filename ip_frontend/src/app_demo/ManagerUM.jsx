// import React, { useState, useMemo } from "react";
// import styles from "../../styles/manager/mum.module.css";

// const ManagerUserManagement = () => {
// const [users, setUsers] = useState([
//   {
//     _id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "9876543210",
//     role: "member",
//     membership: {
//       type: "Gold",
//       validity: { startDate: "2025-01-01", endDate: "2025-12-31" },
//       status: "active",
//     },
//     uniqueIdCard: "ID123",
//     status: "registered",
//     createdAt: "2025-01-15",
//   },
//   {
//     _id: "2",
//     name: "Alice Manager",
//     email: "alice@example.com",
//     phone: "9123456789",
//     role: "manager",
//     membership: {
//       type: null,
//       validity: { startDate: null, endDate: null },
//       status: "inactive",
//     },
//     uniqueIdCard: "ID124",
//     status: "pending",
//     createdAt: "2025-02-10",
//   },
//   {
//     _id: "3",
//     name: "Bob Smith",
//     email: "bob@example.com",
//     phone: "9001122334",
//     role: "member",
//     membership: {
//       type: "Silver",
//       validity: { startDate: "2025-03-01", endDate: "2025-08-31" },
//       status: "active",
//     },
//     uniqueIdCard: "ID125",
//     status: "registered",
//     createdAt: "2025-03-05",
//   },
//   {
//     _id: "4",
//     name: "Clara Admin",
//     email: "clara@example.com",
//     phone: "9898989898",
//     role: "admin",
//     membership: {
//       type: null,
//       validity: { startDate: null, endDate: null },
//       status: "inactive",
//     },
//     uniqueIdCard: "ID126",
//     status: "active",
//     createdAt: "2025-04-01",
//   },
//   {
//     _id: "5",
//     name: "David Lee",
//     email: "david@example.com",
//     phone: "9123456700",
//     role: "member",
//     membership: {
//       type: "Platinum",
//       validity: { startDate: "2025-01-20", endDate: "2025-12-20" },
//       status: "active",
//     },
//     uniqueIdCard: "ID127",
//     status: "registered",
//     createdAt: "2025-01-20",
//   },
//   {
//     _id: "6",
//     name: "Eva Green",
//     email: "eva@example.com",
//     phone: "9112233445",
//     role: "member",
//     membership: {
//       type: "Bronze",
//       validity: { startDate: "2025-06-01", endDate: "2025-09-30" },
//       status: "expired",
//     },
//     uniqueIdCard: "ID128",
//     status: "inactive",
//     createdAt: "2025-06-02",
//   },
//   {
//     _id: "7",
//     name: "Frank Black",
//     email: "frank@example.com",
//     phone: "9876501234",
//     role: "member",
//     membership: {
//       type: "Gold",
//       validity: { startDate: "2025-05-01", endDate: "2025-10-31" },
//       status: "active",
//     },
//     uniqueIdCard: "ID129",
//     status: "registered",
//     createdAt: "2025-05-03",
//   },
//   {
//     _id: "8",
//     name: "Grace Admin",
//     email: "grace@example.com",
//     phone: "9900112233",
//     role: "admin",
//     membership: {
//       type: null,
//       validity: { startDate: null, endDate: null },
//       status: "inactive",
//     },
//     uniqueIdCard: "ID130",
//     status: "active",
//     createdAt: "2025-03-15",
//   },
//   {
//     _id: "9",
//     name: "Henry Clark",
//     email: "henry@example.com",
//     phone: "9988776655",
//     role: "member",
//     membership: {
//       type: "Silver",
//       validity: { startDate: "2025-07-01", endDate: "2025-12-31" },
//       status: "active",
//     },
//     uniqueIdCard: "ID131",
//     status: "registered",
//     createdAt: "2025-07-02",
//   },
//   {
//     _id: "10",
//     name: "Isla Manager",
//     email: "isla@example.com",
//     phone: "9012345678",
//     role: "manager",
//     membership: {
//       type: null,
//       validity: { startDate: null, endDate: null },
//       status: "inactive",
//     },
//     uniqueIdCard: "ID132",
//     status: "pending",
//     createdAt: "2025-02-25",
//   },
// ]);


//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [order, setOrder] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalMode, setModalMode] = useState(null);

//   const rowsPerPage = 10;

//   // 🔍 Search & Sort
//   const filteredUsers = useMemo(() => {
//     let filtered = [...users];
//     if (search) {
//       filtered = filtered.filter(
//         (u) =>
//           u.name.toLowerCase().includes(search.toLowerCase()) ||
//           u.email.toLowerCase().includes(search.toLowerCase()) ||
//           u.phone.includes(search) ||
//           (u.uniqueIdCard &&
//             u.uniqueIdCard.toLowerCase().includes(search.toLowerCase()))
//       );
//     }

//     filtered.sort((a, b) => {
//       if (order === "asc") {
//         return a[sortBy] > b[sortBy] ? 1 : -1;
//       } else {
//         return a[sortBy] < b[sortBy] ? 1 : -1;
//       }
//     });

//     return filtered;
//   }, [users, search, sortBy, order]);

//   // 📑 Pagination
//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const paginatedUsers = filteredUsers.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   // 📝 Update
//   const handleUpdate = () => {
//     setUsers((prev) =>
//       prev.map((u) => (u._id === selectedUser._id ? selectedUser : u))
//     );
//     setSelectedUser(null);
//     setModalMode(null);
//   };

//   // ❌ Delete
//   const handleDelete = () => {
//     setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
//     setSelectedUser(null);
//     setModalMode(null);
//   };

//   return (
//     <div className={styles.aumcontainer}>
//       <h2 className={styles.mumheader}>User Management</h2>

//       {/* Search + Sort */}
//       <div className={styles.controls}>
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="createdAt">Created At</option>
//           <option value="name">Name</option>
//           <option value="email">Email</option>
//         </select>
//         <select value={order} onChange={(e) => setOrder(e.target.value)}>
//           <option value="desc">Desc</option>
//           <option value="asc">Asc</option>
//         </select>
//       </div>

//       {/* User Cards */}
//       <div className={styles.userGrid}>
//         {paginatedUsers.length > 0 ? (
//           paginatedUsers.map((user) => (
//             <div
//               key={user._id}
//               className={styles.userCard}
//               onClick={() => {
//                 setSelectedUser({ ...user });
//                 setModalMode("view");
//               }}
//             >
//               <div className={styles.cardHeader}>
//                 <h3>{user.name}</h3>
//                 <span className={styles.role}>{(user.membership?.status===null?"inactive":user.membership?.status)}</span>
//               </div>
//               <p>{user.email}</p>
//               <p>{user.phone}</p>
//               <p className={styles.membership}>
//                 {user.membership?.type || "No Membership"} •{" "}
//                 {user.membership?.status}
//               </p>
//               <div className={styles.cardActions}>
//                 <button
//                   className={styles.editBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedUser({ ...user });
//                     setModalMode("edit");
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className={styles.deleteBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedUser(user);
//                     setModalMode("delete");
//                   }}
//                 >
//                   Request Deletion
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className={styles.empty}>No users found.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </button>
//         <span>
//           {page} / {totalPages || 1}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* Modal */}
//       {selectedUser && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             {modalMode === "view" && (
//               <>
//                 <h3>User Details</h3>
//                 <p><b>Name:</b> {selectedUser.name}</p>
//                 <p><b>Email:</b> {selectedUser.email}</p>
//                 <p><b>Phone:</b> {selectedUser.phone}</p>
//                 <p><b>Role:</b> {selectedUser.role}</p>
//                 <p><b>Status:</b> {selectedUser.status}</p>
//                 <p><b>Unique ID:</b> {selectedUser.uniqueIdCard}</p>
//                 <p>
//                   <b>Membership:</b> {selectedUser.membership?.type || "-"} (
//                   {selectedUser.membership?.status})
//                 </p>
//                 <p>
//                   <b>Validity:</b>{" "}
//                   {selectedUser.membership?.validity?.startDate || "-"} to{" "}
//                   {selectedUser.membership?.validity?.endDate || "-"}
//                 </p>
//                 <button onClick={() => setSelectedUser(null)}>Close</button>
//               </>
//             )}

//             {modalMode === "delete" && (
//               <>
//                 <h3>Request deletion of {selectedUser.name}?</h3>
//                 <div>
//                   <button className={styles.deleteBtn} onClick={handleDelete}>
//                     Confirm
//                   </button>
//                   <button onClick={() => setSelectedUser(null)}>Cancel</button>
//                 </div>
//               </>
//             )}

//             {modalMode === "edit" && (
//               <>
//                 <h3>Edit User</h3>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={selectedUser.name}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, name: e.target.value })
//                   }
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={selectedUser.email}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, email: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={selectedUser.phone}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, phone: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Unique ID"
//                   value={selectedUser.uniqueIdCard || ""}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       uniqueIdCard: e.target.value,
//                     })
//                   }
//                 />

//                 <select
//                   value={selectedUser.role}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, role: e.target.value })
//                   }
//                 >
//                   <option value="admin">Admin</option>
//                   <option value="manager">Manager</option>
//                   <option value="member">Member</option>
//                 </select>

//                 <select
//                   value={selectedUser.status}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, status: e.target.value })
//                   }
//                 >
//                   <option value="registered">Registered</option>
//                   <option value="pending">Pending</option>
//                 </select>

//                 <select
//                   value={selectedUser.membership?.status || "inactive"}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         status: e.target.value,
//                       },
//                     })
//                   }
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>

//                 <select
//                   value={selectedUser.membership?.type || ""}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         type: e.target.value,
//                       },
//                     })
//                   }
//                 >
//                   <option value="">Select Membership</option>
//                   <option value="Gold">Gold</option>
//                   <option value="Silver">Silver</option>
//                   <option value="Platinum">Platinum</option>
//                 </select>

//                 <label>Validity Start</label>
//                 <input
//                   type="date"
//                   value={
//                     selectedUser.membership?.validity?.startDate
//                       ? new Date(
//                           selectedUser.membership.validity.startDate
//                         ).toISOString().split("T")[0]
//                       : ""
//                   }
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         validity: {
//                           ...selectedUser.membership?.validity,
//                           startDate: e.target.value,
//                         },
//                       },
//                     })
//                   }
//                 />
//                 <label>Validity End</label>
//                 <input
//                   type="date"
//                   value={
//                     selectedUser.membership?.validity?.endDate
//                       ? new Date(
//                           selectedUser.membership.validity.endDate
//                         ).toISOString().split("T")[0]
//                       : ""
//                   }
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         validity: {
//                           ...selectedUser.membership?.validity,
//                           endDate: e.target.value,
//                         },
//                       },
//                     })
//                   }
//                 />

//                 <div>
//                   <button className={styles.updateBtn} onClick={handleUpdate}>
//                     Update
//                   </button>
//                   <button onClick={() => setSelectedUser(null)}>Cancel</button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagerUserManagement;













//part 2

// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import styles from "../../styles/manager/mum.module.css";

// const ManagerUserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [order, setOrder] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(6);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalMode, setModalMode] = useState(null); // view/edit/delete

//   // 🔄 Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.get("http://localhost:3000/api/users", {
//         params: { search, sortBy, order, page, limit },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // assumes JWT stored here
//         },
//       });

//       setUsers(res.data.users || []);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Failed to fetch users. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [search, sortBy, order, page, limit]);

//   // 📝 Update user API
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.put(
//         `http://localhost:3000/api/auth/update-user/${selectedUser._id}`,
//         selectedUser,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setModalMode(null);
//       setSelectedUser(null);
//       fetchUsers(); // refresh
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Failed to update user. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ❌ Request deletion API
//   const handleDeleteRequest = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(
//         "http://localhost:3000/api/manager/delete-member-request",
//         { userId: selectedUser._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setModalMode(null);
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Failed to request deletion."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.aumcontainer}>
//       <h2 className={styles.mumheader}>User Management</h2>

//       {/* Search + Sort */}
//       <div className={styles.controls}>
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="createdAt">Created At</option>
//           <option value="name">Name</option>
//           <option value="email">Email</option>
//         </select>
//         <select value={order} onChange={(e) => setOrder(e.target.value)}>
//           <option value="desc">Desc</option>
//           <option value="asc">Asc</option>
//         </select>
//       </div>

//       {/* Loader & Error */}
//       {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//       {/* User Cards */}
//       <div className={styles.userGrid}>
//         {!loading && users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user._id}
//               className={styles.userCard}
//               onClick={() => {
//                 setSelectedUser({ ...user });
//                 setModalMode("view");
//               }}
//             >
//               <div className={styles.cardHeader}>
//                 <h3>{user.name}</h3>
//                 <span className={styles.role}>
//                   {user.membership?.status || "inactive"}
//                 </span>
//               </div>
//               <p>{user.email}</p>
//               <p>{user.phone}</p>
//               <p className={styles.membership}>
//                 {user.membership?.type || "No Membership"} •{" "}
//                 {user.membership?.status}
//               </p>
//               <div className={styles.cardActions}>
//                 <button
//                   className={styles.editBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedUser({ ...user });
//                     setModalMode("edit");
//                   }}
//                 >
//                   Edit
//                 </button>
//                 {user.role === "member" && (
//                   <button
//                     className={styles.deleteBtn}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedUser(user);
//                       setModalMode("delete");
//                     }}
//                   >
//                     Request Deletion
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           !loading && <p className={styles.empty}>No users found.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </button>
//         <span>Page {page}</span>
//         <button
//           disabled={users.length < limit}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* Modal */}
//       {selectedUser && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             {modalMode === "view" && (
//               <>
//                 <h3>User Details</h3>
//                 <p><b>Name:</b> {selectedUser.name}</p>
//                 <p><b>Email:</b> {selectedUser.email}</p>
//                 <p><b>Phone:</b> {selectedUser.phone}</p>
//                 <p><b>Role:</b> {selectedUser.role}</p>
//                 <p><b>Status:</b> {selectedUser.status}</p>
//                 <p><b>Unique ID:</b> {selectedUser.uniqueIdCard}</p>
//                 <button onClick={() => setSelectedUser(null)}>Close</button>
//               </>
//             )}

//             {modalMode === "edit" && (
//               <>
//                 <h3>Edit User</h3>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={selectedUser.name}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, name: e.target.value })
//                   }
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={selectedUser.email}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, email: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={selectedUser.phone}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, phone: e.target.value })
//                   }
//                 />
//                 <select
//                   value={selectedUser.role}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, role: e.target.value })
//                   }
//                 >
//                   <option value="admin">Admin</option>
//                   <option value="manager">Manager</option>
//                   <option value="member">Member</option>
//                 </select>
//                 <div>
//                   <button
//                     className={styles.updateBtn}
//                     onClick={handleUpdate}
//                     disabled={loading}
//                   >
//                     {loading ? "Updating..." : "Update"}
//                   </button>
//                   <button onClick={() => setSelectedUser(null)}>Cancel</button>
//                 </div>
//               </>
//             )}

//             {modalMode === "delete" && (
//               <>
//                 <h3>
//                   Request deletion of <b>{selectedUser.name}</b>?
//                 </h3>
//                 <div>
//                   <button
//                     className={styles.deleteBtn}
//                     onClick={handleDeleteRequest}
//                     disabled={loading}
//                   >
//                     {loading ? "Requesting..." : "Confirm"}
//                   </button>
//                   <button onClick={() => setSelectedUser(null)}>Cancel</button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagerUserManagement;











//part 3
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "../../styles/manager/mum.module.css";

// const API_HOST = "http://localhost:3000/api";

// const ManagerUserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [order, setOrder] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalMode, setModalMode] = useState(null); // view/edit/delete

//   // 🔄 Fetch users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.get(`${API_HOST}/users`, {
//         params: { search, sortBy, order, page, limit },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setUsers(res.data.users || []);
//       setTotalPages(res.data.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Failed to fetch users. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [search, sortBy, order, page, limit]);

//   // 📝 Update user
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       console.log(selectedUser._id);
      
//       await axios.put(
//         `${API_HOST}/auth/update-user/${selectedUser._id}`,
//         selectedUser,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setModalMode(null);
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to update user.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ❌ Request delete
//   const handleDeleteRequest = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(
//         `${API_HOST}/manager/delete-member-request`,
//         { userId: selectedUser._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setModalMode(null);
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to request deletion.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.aumcontainer}>
//       <h2 className={styles.mumheader}>User Management</h2>

//       {/* Search + Sort */}
//       <div className={styles.controls}>
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="createdAt">Created At</option>
//           <option value="name">Name</option>
//           <option value="email">Email</option>
//         </select>
//         <select value={order} onChange={(e) => setOrder(e.target.value)}>
//           <option value="desc">Desc</option>
//           <option value="asc">Asc</option>
//         </select>
//       </div>

//       {/* Loader & Error */}
//       {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//       {/* User Cards */}
//       <div className={styles.userGrid}>
//         {!loading && users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user._id}
//               className={styles.userCard}
//               onClick={() => {
//                 setSelectedUser({ ...user });
//                 setModalMode("view");
//               }}
//             >
//               <div className={styles.cardHeader}>
//                 <h3>{user.name}</h3>
//                 <span className={styles.role}>
//                   {user.membership?.status || "inactive"}
//                 </span>
//               </div>
//               <p>{user.email}</p>
//               <p>{user.phone}</p>
//               <p className={styles.membership}>
//                 {user.membership?.type || "No Membership"} •{" "}
//                 {user.membership?.status}
//               </p>
//               <div className={styles.cardActions}>
//                 <button
//                   className={styles.editBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedUser({ ...user });
//                     setModalMode("edit");
//                   }}
//                 >
//                   Edit
//                 </button>
//                 {user.role === "member" && (
//                   <button
//                     className={styles.deleteBtn}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedUser(user);
//                       setModalMode("delete");
//                     }}
//                   >
//                     Request Deletion
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           !loading && <p className={styles.empty}>No users found.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </button>
//         <span>
//           {page} / {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* Modal */}
//       {selectedUser && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             {modalMode === "view" && (
//               <>
//                 <h3>User Details</h3>
//                 <p><b>Name:</b> {selectedUser.name}</p>
//                 <p><b>Email:</b> {selectedUser.email}</p>
//                 <p><b>Phone:</b> {selectedUser.phone}</p>
//                 <p><b>Role:</b> {selectedUser.role}</p>
//                 <p><b>Status:</b> {selectedUser.status}</p>
//                 <p><b>Unique ID:</b> {selectedUser.uniqueIdCard}</p>
//                 <p>
//                   <b>Membership:</b> {selectedUser.membership?.type || "-"} (
//                   {selectedUser.membership?.status})
//                 </p>
//                 <p>
//                   <b>Validity:</b>{" "}
//                   {selectedUser.membership?.validity?.startDate || "-"} to{" "}
//                   {selectedUser.membership?.validity?.endDate || "-"}
//                 </p>
//                 <button onClick={() => setSelectedUser(null)}>Close</button>
//               </>
//             )}

//             {modalMode === "edit" && (
//               <>
//                 <h3>Edit User</h3>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={selectedUser.name}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, name: e.target.value })
//                   }
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={selectedUser.email}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, email: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={selectedUser.phone}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, phone: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Unique ID"
//                   value={selectedUser.uniqueIdCard || ""}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       uniqueIdCard: e.target.value,
//                     })
//                   }
//                 />

//                 <select
//                   value={selectedUser.role}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, role: e.target.value })
//                   }
//                 >
//                   <option value="admin">Admin</option>
//                   <option value="manager">Manager</option>
//                   <option value="member">Member</option>
//                 </select>

//                 <select
//                   value={selectedUser.status}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, status: e.target.value })
//                   }
//                 >
//                   <option value="registered">Registered</option>
//                   <option value="pending">Pending</option>
//                 </select>

//                 <select
//                   value={selectedUser.membership?.status || "inactive"}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         status: e.target.value,
//                       },
//                     })
//                   }
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>

//                 <select
//                   value={selectedUser.membership?.type || ""}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         type: e.target.value,
//                       },
//                     })
//                   }
//                 >
//                   <option value="">Select Membership</option>
//                   <option value="Gold">Gold</option>
//                   <option value="Silver">Silver</option>
//                   <option value="Platinum">Platinum</option>
//                 </select>

//                 <label>Validity Start</label>
//                 <input
//                   type="date"
//                   value={
//                     selectedUser.membership?.validity?.startDate
//                       ? new Date(
//                           selectedUser.membership.validity.startDate
//                         ).toISOString().split("T")[0]
//                       : ""
//                   }
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         validity: {
//                           ...selectedUser.membership?.validity,
//                           startDate: e.target.value,
//                         },
//                       },
//                     })
//                   }
//                 />
//                 <label>Validity End</label>
//                 <input
//                   type="date"
//                   value={
//                     selectedUser.membership?.validity?.endDate
//                       ? new Date(
//                           selectedUser.membership.validity.endDate
//                         ).toISOString().split("T")[0]
//                       : ""
//                   }
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         validity: {
//                           ...selectedUser.membership?.validity,
//                           endDate: e.target.value,
//                         },
//                       },
//                     })
//                   }
//                 />

//                 <div>
//                   <button
//                     className={styles.updateBtn}
//                     onClick={handleUpdate}
//                     disabled={loading}
//                   >
//                     {loading ? "Updating..." : "Update"}
//                   </button>
//                   <button onClick={() => setSelectedUser(null)}>Cancel</button>
//                 </div>
//               </>
//             )}

//             {modalMode === "delete" && (
//               <>
//                 <h3>Request deletion of {selectedUser.name}?</h3>
//                 <div>
//                   <button
//                     className={styles.deleteBtn}
//                     onClick={handleDeleteRequest}
//                     disabled={loading}
//                   >
//                     {loading ? "Requesting..." : "Confirm"}
//                   </button>
//                   <button onClick={() => setSelectedUser(null)}>Cancel</button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagerUserManagement;




























// part 4
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "../../styles/manager/mum.module.css";

// const API_HOST = "http://localhost:3000/api";

// const ManagerUserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [order, setOrder] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalMode, setModalMode] = useState(null); // view/edit/delete

//   // 🔄 Fetch users (only members with status=registered)
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.get(`${API_HOST}/users`, {
//         params: { 
//           search, 
//           sortBy, 
//           order, 
//           page, 
//           limit,
//           role: "member",
//           status: "registered"
//         },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setUsers(res.data.users || []);
//       setTotalPages(res.data.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Failed to fetch users. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [search, sortBy, order, page, limit]);

//   // 📝 Update user
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.put(
//         `${API_HOST}/auth/update-user/${selectedUser._id}`,
//         selectedUser,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setModalMode(null);
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to update user.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ❌ Request delete
//   const handleDeleteRequest = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(
//         `${API_HOST}/manager/delete-member-request`,
//         { userId: selectedUser._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setModalMode(null);
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to request deletion.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.aumcontainer}>
//       <h2 className={styles.mumheader}>User Management</h2>

//       {/* Search + Sort */}
//       <input
//           type="text"
//           id={styles.searchBar2}
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />
//       <div className={styles.controls}>
//         <input
//           type="text"
//           id={styles.searchBar}
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="createdAt">Created At</option>
//           <option value="name">Name</option>
//           <option value="email">Email</option>
//         </select>
//         <select value={order} onChange={(e) => setOrder(e.target.value)}>
//           <option value="desc">Desc</option>
//           <option value="asc">Asc</option>
//         </select>
//       </div>

//       {/* Loader & Error */}
//       {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//       {/* User Cards */}
//       <div className={styles.userGrid}>
//         {!loading && users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user._id}
//               className={styles.userCard}
//               onClick={() => {
//                 setSelectedUser({ ...user });
//                 setModalMode("view");
//               }}
//             >
//               <div className={styles.cardHeader}>
//                 <h3>{user.name}</h3>
//                 <span className={styles.role}>
//                   {user.membership?.status || "inactive"}
//                 </span>
//               </div>
//               <p>{user.email}</p>
//               <p>{user.phone}</p>
//               <p className={styles.membership}>
//                 {user.membership?.type || "No Membership"} •{" "}
//                 {user.membership?.status}
//               </p>
//               <div className={styles.cardActions}>
//                 <button
//                   className={styles.editBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedUser({ ...user });
//                     setModalMode("edit");
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className={styles.deleteBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedUser(user);
//                     setModalMode("delete");
//                   }}
//                 >
//                   Request Deletion
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           !loading && <p className={styles.empty}>No users found.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </button>
//         <span>
//           {page} / {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* Modal */}
//       {selectedUser && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             {modalMode === "view" && (
//               <>
//                 <h3>User Details</h3>
//                 <p><b>Name:</b> {selectedUser.name}</p>
//                 <p><b>Email:</b> {selectedUser.email}</p>
//                 <p><b>Phone:</b> {selectedUser.phone}</p>
//                 <p><b>Status:</b> {selectedUser.status}</p>
//                 <p><b>Unique ID:</b> {selectedUser.uniqueIdCard}</p>
//                 <p>
//                   <b>Membership:</b> {selectedUser.membership?.type || "-"} (
//                   {selectedUser.membership?.status})
//                 </p>
//                 <p>
//                   <b>Validity:</b>{" "}
//                   {selectedUser.membership?.validity?.startDate || "-"} to{" "}
//                   {selectedUser.membership?.validity?.endDate || "-"}
//                 </p>
//                 <button onClick={() => setSelectedUser(null)}>Close</button>
//               </>
//             )}

//             {modalMode === "edit" && (
//               <>
//                 <h3>Edit User</h3>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={selectedUser.name}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, name: e.target.value })
//                   }
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={selectedUser.email}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, email: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={selectedUser.phone}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, phone: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Unique ID"
//                   value={selectedUser.uniqueIdCard || ""}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       uniqueIdCard: e.target.value,
//                     })
//                   }
//                 />

//                 {/* removed role dropdown */}

//                 <select
//                   value={selectedUser.status}
//                   onChange={(e) =>
//                     setSelectedUser({ ...selectedUser, status: e.target.value })
//                   }
//                 >
//                   <option value="registered">Registered</option>
//                   <option value="pending">Pending</option>
//                 </select>

//                 <select
//                   value={selectedUser.membership?.status || "inactive"}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         status: e.target.value,
//                       },
//                     })
//                   }
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>

//                 <select
//                   value={selectedUser.membership?.type || ""}
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         type: e.target.value,
//                       },
//                     })
//                   }
//                 >
//                   <option value="">Select Membership</option>
//                   <option value="Gold">Gold</option>
//                   <option value="Silver">Silver</option>
//                   <option value="Platinum">Platinum</option>
//                 </select>

//                 <label>Validity Start</label>
//                 <input
//                   type="date"
//                   value={
//                     selectedUser.membership?.validity?.startDate
//                       ? new Date(
//                           selectedUser.membership.validity.startDate
//                         ).toISOString().split("T")[0]
//                       : ""
//                   }
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         validity: {
//                           ...selectedUser.membership?.validity,
//                           startDate: e.target.value,
//                         },
//                       },
//                     })
//                   }
//                 />
//                 <label>Validity End</label>
//                 <input
//                   type="date"
//                   value={
//                     selectedUser.membership?.validity?.endDate
//                       ? new Date(
//                           selectedUser.membership.validity.endDate
//                         ).toISOString().split("T")[0]
//                       : ""
//                   }
//                   onChange={(e) =>
//                     setSelectedUser({
//                       ...selectedUser,
//                       membership: {
//                         ...selectedUser.membership,
//                         validity: {
//                           ...selectedUser.membership?.validity,
//                           endDate: e.target.value,
//                         },
//                       },
//                     })
//                   }
//                 />

//                 <div className={styles.modalControls}>
//                   <button
//                     className={styles.updateBtn}
//                     onClick={handleUpdate}
//                     disabled={loading}
//                   >
//                     {loading ? "Updating..." : "Update"}
//                   </button>
//                   <button className={styles.cancelButton} onClick={() => setSelectedUser(null)}>Cancel</button>
//                 </div>
//               </>
//             )}

//             {modalMode === "delete" && (
//               <>
//                 <h3>Request deletion of {selectedUser.name}?</h3>
//                 <div>
//                   <button
//                     className={styles.deleteBtn}
//                     onClick={handleDeleteRequest}
//                     disabled={loading}
//                   >
//                     {loading ? "Requesting..." : "Confirm"}
//                   </button>
//                   <button onClick={() => setSelectedUser(null)}>Cancel</button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagerUserManagement;



import React, { useState, useEffect } from "react";
import axios from "axios";
import PendingUserApproval from "./pendingReqs"
import styles from "../../../styles/manager/mum.module.css";
import DeleteUserRequests from "./DelReq";

const API_HOST = "http://localhost:3000/api";

const ManagerUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  //added
  //   const [newUser, setNewUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  //   uniqueIdCard: "",
  //   Gender: "Male",
  //   role: "member",
  //   membership: "",
  // });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    uniqueIdCard: "",
    Gender: "Male",
    role: "member",
    membership: {
      type: "",
      status: "inactive",
      validity: {
        startDate: "",
        endDate: "",
      },
    },
  });
  /////////

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState(null); // view/edit/delete

  // 🔄 Fetch users (only members with status=registered)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_HOST}/users`, {
        params: { 
          search, 
          sortBy, 
          order, 
          page, 
          limit,
          role: "member",
          status: "registered"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch users. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, sortBy, order, page, limit]);

  // 📝 Update user
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.put(
        `${API_HOST}/auth/update-user/${selectedUser._id}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setModalMode(null);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Request delete
  const handleDeleteRequest = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(
        `${API_HOST}/manager/delete-member-request`,
        { userId: selectedUser._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setModalMode(null);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to request deletion.");
    } finally {
      setLoading(false);
    }
  };

// added
//  const handleAddUser = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(`${API_HOST}/auth/add-user`, newUser, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setModalMode(null);
//       setNewUser({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         uniqueIdCard: "",
//         Gender: "Male",
//         role: "member",
//         membership: "",
//       });
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to add user.");
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleAddUser = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(`${API_HOST}/auth/add-user`, newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setModalMode(null);
      setNewUser({
        name: "",
        email: "",
        password: "",
        phone: "",
        uniqueIdCard: "",
        Gender: "Male",
        role: "member",
        membership: {
          type: "",
          status: "inactive",
          validity: {
            startDate: "",
            endDate: "",
          },
        },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add user.");
    } finally {
      setLoading(false);
    }
  };
  ////////
  console.log(modalMode);
  
  return (
    <div className={styles.aumcontainer}>
      <h2 className={styles.mumheader}>User Management</h2>

      {/* Search + Sort */}
      <input
          type="text"
          id={styles.searchBar2}
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      <div className={styles.controls}>
        <input
          type="text"
          id={styles.searchBar}
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
 <button
           style={{cursor:"pointer"}}

          className={styles.addBtn}
          onClick={() => setModalMode("add")}
        >
           Add User
        </button>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      {/* Loader & Error */}
      {loading && <p 
      // style={{ textAlign: "center" }}
      className={styles.empty}>
        Loading...</p>}
      {error && <p id={styles.errormsg} style={{ color: "red", textAlign: "center",padding:"4px" }}>{error}</p>}

      {/* User Cards */}
      <div className={styles.userGrid}>
        {!loading && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className={styles.userCard}
              onClick={() => {
                setSelectedUser({ ...user });
                setModalMode("view");
              }}
            >
              <div className={styles.cardHeader}>
                <h3>{user.name}</h3>
                <span style={{backgroundColor:user.membership?.status==="active"?"#50f39f35":"#cd212139"}} className={styles.role}>
                  {user.membership?.status || "inactive"}
                </span>
              </div>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p className={styles.membership}>
                {user.membership?.type || "No Membership"} •{" "}
                {user.membership?.status}
              </p>
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser({ ...user });
                    setModalMode("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser(user);
                    setModalMode("delete");
                  }}
                >
                  Request Deletion
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className={styles.empty}>No users found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

          {/* Modal */}


        {/* {modalMode==="add" &&(
<div className={styles.modal}>
          <div className={styles.modalContent}>

           
            {modalMode === "add" && (
              <>
                <h3>Add User</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Unique ID"
                  value={newUser.uniqueIdCard}
                  onChange={(e) =>
                    setNewUser({ ...newUser, uniqueIdCard: e.target.value })
                  }
                />

                <select
                  value={newUser.Gender}
                  onChange={(e) =>
                    setNewUser({ ...newUser, Gender: e.target.value })
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="member">Member</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>

                {newUser.role === "member" && (
                  <select
                    value={newUser.membership}
                    onChange={(e) =>
                      setNewUser({ ...newUser, membership: e.target.value })
                    }
                  >
                    <option value="">Select Membership</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                )}

                <div className={styles.modalControls}>
                  <button
                    className={styles.addBtn}
                    onClick={handleAddUser}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setModalMode(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            </div>
            </div>

          )
        } */}


   {modalMode === "add" && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add User</h3>

            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Unique ID"
              value={newUser.uniqueIdCard}
              onChange={(e) =>
                setNewUser({ ...newUser, uniqueIdCard: e.target.value })
              }
            />

            {/* Gender */}
            <select
              value={newUser.Gender}
              onChange={(e) =>
                setNewUser({ ...newUser, Gender: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* Role */}
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="member">Member</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            {/* Membership (only for members) */}
            {newUser.role === "member" && (
              <>
                <select
                  value={newUser.membership.type}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      membership: {
                        ...newUser.membership,
                        type: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">Select Membership</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Platinum">Platinum</option>
                </select>

                <select
                  value={newUser.membership.status}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      membership: {
                        ...newUser.membership,
                        status: e.target.value,
                      },
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <label>Validity Start</label>
                <input
                  type="date"
                  value={newUser.membership.validity.startDate}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      membership: {
                        ...newUser.membership,
                        validity: {
                          ...newUser.membership.validity,
                          startDate: e.target.value,
                        },
                      },
                    })
                  }
                />

                <label>Validity End</label>
                <input
                  type="date"
                  value={newUser.membership.validity.endDate}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      membership: {
                        ...newUser.membership,
                        validity: {
                          ...newUser.membership.validity,
                          endDate: e.target.value,
                        },
                      },
                    })
                  }
                />
              </>
            )}

            <div className={styles.modalControls}>
              <button
                className={styles.addBtn}
                onClick={handleAddUser}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setModalMode(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}




      {selectedUser && (
        <div className={styles.modal}>
          {/* <div className={`${styles.modalContent} `}>

         

            {modalMode === "view" && (
              <>
                <h3>User Details</h3>
                <p><b>Name:</b> {selectedUser.name}</p>
                <p><b>Email:</b> {selectedUser.email}</p>
                <p><b>Gender:</b> {selectedUser.Gender}</p>
                <p><b>Phone:</b> {selectedUser.phone}</p>
                <p><b>Status:</b> {selectedUser.status}</p>
                <p><b>Unique ID:</b> {selectedUser.uniqueIdCard}</p>
                <p>
                  <b>Membership:</b> {selectedUser.membership?.type || "-"} (
                  {selectedUser.membership?.status})
                </p>
 

                <p>
                  <b>Validity:</b>{" "}
                  {selectedUser.membership?.validity?.startDate || "-"} to{" "}
                  {selectedUser.membership?.validity?.endDate || "-"}
                </p>
                <button className={styles.cancelButton} onClick={() => setSelectedUser(null)}>Close</button>
              </>
            )} */}
            <div
    className={`${styles.modalContent} ${
      styles[selectedUser.membership?.type?.toLowerCase()]}
        ${styles["ucard"]}
      }`}
    >
    {modalMode === "view" && (
      <>
        <h3>User Details</h3>
        <p><b>Name:</b> {selectedUser.name}</p>
        <p><b>Email:</b> {selectedUser.email}</p>
        <p>
          <b>Gender:</b>{" "}
          <span
            className={`${styles.genderBadge} ${
              selectedUser.Gender === "Male" ? styles.male : styles.female
            }`}
          >
            {selectedUser.Gender}
          </span>
        </p>
        <p><b>Phone:</b> {selectedUser.phone}</p>
        <p><b>Status:</b> {selectedUser.status}</p>
        <p><b>Unique ID:</b> {selectedUser.uniqueIdCard}</p>
        <p>
          <b>Membership:</b> {selectedUser.membership?.type || "-"} (
          {selectedUser.membership?.status})
        </p>
        <p>
          <b>Validity:</b>{" "}
          {selectedUser.membership?.validity?.startDate || "-"} to{" "}
          {selectedUser.membership?.validity?.endDate || "-"}
        </p>
        <button
          className={styles.cancelButton}
          onClick={() => setSelectedUser(null)}
        >
          Close
        </button>
      </>
    )}
  

            {modalMode === "edit" && (
              <>
                <h3>Edit User</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={selectedUser.phone}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Unique ID"
                  value={selectedUser.uniqueIdCard || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      uniqueIdCard: e.target.value,
                    })
                  }
                />

                {/* removed role dropdown */}

                <select
                  value={selectedUser.status}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, status: e.target.value })
                  }
                >
                  <option value="registered">Registered</option>
                  <option value="pending">Pending</option>
                </select>

                <select
                  value={selectedUser.membership?.status || "inactive"}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      membership: {
                        ...selectedUser.membership,
                        status: e.target.value,
                      },
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  value={selectedUser.membership?.type || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      membership: {
                        ...selectedUser.membership,
                        type: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">Select Membership</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Platinum">Platinum</option>
                </select>

                <label>Validity Start</label>
                <input
                  type="date"
                  value={
                    selectedUser.membership?.validity?.startDate
                      ? new Date(
                          selectedUser.membership.validity.startDate
                        ).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      membership: {
                        ...selectedUser.membership,
                        validity: {
                          ...selectedUser.membership?.validity,
                          startDate: e.target.value,
                        },
                      },
                    })
                  }
                />
                <label>Validity End</label>
                <input
                  type="date"
                  value={
                    selectedUser.membership?.validity?.endDate
                      ? new Date(
                          selectedUser.membership.validity.endDate
                        ).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      membership: {
                        ...selectedUser.membership,
                        validity: {
                          ...selectedUser.membership?.validity,
                          endDate: e.target.value,
                        },
                      },
                    })
                  }
                />

                <div className={styles.modalControls}>
                  <button
                    className={styles.updateBtn}
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button className={styles.cancelButton} onClick={() => setSelectedUser(null)}>Cancel</button>
                </div>
              </>
            )}

            {modalMode === "delete" && (
              <>
                <h3>Request deletion of {selectedUser.name}?</h3>
                <div>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleDeleteRequest}
                    disabled={loading}
                  >
                    {loading ? "Requesting..." : "Confirm"}
                  </button>
                  <button className={styles.cancelButton} onClick={() => setSelectedUser(null)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

{/* 
      <PendingUserApproval/>
      <DeleteUserRequests/> */}
    </div>
  );
};

export default ManagerUserManagement;















// part5:
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "../../styles/manager/mum.module.css";

// const API_HOST = "http://localhost:3000/api";

// const ManagerUserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [order, setOrder] = useState("desc");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalMode, setModalMode] = useState(null); // view/edit/delete/add

//   // new user form state
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     uniqueIdCard: "",
//     Gender: "Male",
//     role: "member",
//     membership: "",
//   });

//   // 🔄 Fetch users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.get(`${API_HOST}/users`, {
//         params: {
//           search,
//           sortBy,
//           order,
//           page,
//           limit,
//           role: "member",
//           status: "registered",
//         },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setUsers(res.data.users || []);
//       setTotalPages(res.data.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Failed to fetch users. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [search, sortBy, order, page, limit]);

//   // 📝 Update user
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.put(
//         `${API_HOST}/auth/update-user/${selectedUser._id}`,
//         selectedUser,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setModalMode(null);
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to update user.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ❌ Request delete
//   const handleDeleteRequest = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(
//         `${API_HOST}/manager/delete-member-request`,
//         { userId: selectedUser._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setModalMode(null);
//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to request deletion.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ➕ Add User
//   const handleAddUser = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(`${API_HOST}/auth/add-user`, newUser, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setModalMode(null);
//       setNewUser({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         uniqueIdCard: "",
//         Gender: "Male",
//         role: "member",
//         membership: "",
//       });
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to add user.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.aumcontainer}>
//       <h2 className={styles.mumheader}>User Management</h2>

//       {/* Search + Add User */}
//       <div className={styles.topControls}>
//         <input
//           type="text"
//           id={styles.searchBar2}
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />
//         <button
//           className={styles.addBtn}
//           onClick={() => setModalMode("add")}
//         >
//           ➕ Add User
//         </button>
//       </div>

//       {/* Sort controls */}
//       <div className={styles.controls}>
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="createdAt">Created At</option>
//           <option value="name">Name</option>
//           <option value="email">Email</option>
//         </select>
//         <select value={order} onChange={(e) => setOrder(e.target.value)}>
//           <option value="desc">Desc</option>
//           <option value="asc">Asc</option>
//         </select>
//       </div>

//       {/* Loader & Error */}
//       {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//       {/* User Cards */}
//       <div className={styles.userGrid}>
//         {!loading && users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user._id}
//               className={styles.userCard}
//               onClick={() => {
//                 setSelectedUser({ ...user });
//                 setModalMode("view");
//               }}
//             >
//               <div className={styles.cardHeader}>
//                 <h3>{user.name}</h3>
//                 <span className={styles.role}>
//                   {user.membership?.status || "inactive"}
//                 </span>
//               </div>
//               <p>{user.email}</p>
//               <p>{user.phone}</p>
//               <p className={styles.membership}>
//                 {user.membership?.type || "No Membership"} •{" "}
//                 {user.membership?.status}
//               </p>
//               <div className={styles.cardActions}>
//                 <button
//                   className={styles.editBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedUser({ ...user });
//                     setModalMode("edit");
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className={styles.deleteBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedUser(user);
//                     setModalMode("delete");
//                   }}
//                 >
//                   Request Deletion
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           !loading && <p className={styles.empty}>No users found.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </button>
//         <span>
//           {page} / {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {/* Modal */}
//       {(selectedUser || modalMode === "add") && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             {modalMode === "add" && (
//               <>
//                 <h3>Add User</h3>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={newUser.name}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, name: e.target.value })
//                   }
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={newUser.email}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, email: e.target.value })
//                   }
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={newUser.password}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, password: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={newUser.phone}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, phone: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Unique ID"
//                   value={newUser.uniqueIdCard}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, uniqueIdCard: e.target.value })
//                   }
//                 />

//                 <select
//                   value={newUser.Gender}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, Gender: e.target.value })
//                   }
//                 >
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>

//                 <select
//                   value={newUser.role}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, role: e.target.value })
//                   }
//                 >
//                   <option value="member">Member</option>
//                   <option value="manager">Manager</option>
//                   <option value="admin">Admin</option>
//                 </select>

//                 {newUser.role === "member" && (
//                   <select
//                     value={newUser.membership}
//                     onChange={(e) =>
//                       setNewUser({ ...newUser, membership: e.target.value })
//                     }
//                   >
//                     <option value="">Select Membership</option>
//                     <option value="Gold">Gold</option>
//                     <option value="Silver">Silver</option>
//                     <option value="Platinum">Platinum</option>
//                   </select>
//                 )}

//                 <div className={styles.modalControls}>
//                   <button
//                     className={styles.addBtn}
//                     onClick={handleAddUser}
//                     disabled={loading}
//                   >
//                     {loading ? "Adding..." : "Add"}
//                   </button>
//                   <button
//                     className={styles.cancelButton}
//                     onClick={() => setModalMode(null)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* Keep your existing view/edit/delete modals here */}
//             {modalMode === "view" && (
//               <>
//                 <h3>User Details</h3>
//                 <p><b>Name:</b> {selectedUser.name}</p>
//                 <p><b>Email:</b> {selectedUser.email}</p>
//                 <p><b>Phone:</b> {selectedUser.phone}</p>
//                 <p><b>Status:</b> {selectedUser.status}</p>
//                 <p><b>Unique ID:</b> {selectedUser.uniqueIdCard}</p>
//                 <p><b>Gender:</b> {selectedUser.Gender}</p>
//                 <p>
//                   <b>Membership:</b> {selectedUser.membership?.type || "-"} (
//                   {selectedUser.membership?.status})
//                 </p>
//                 <button onClick={() => setSelectedUser(null)}>Close</button>
//               </>
//             )}
//             {/* edit and delete modals remain unchanged */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagerUserManagement;

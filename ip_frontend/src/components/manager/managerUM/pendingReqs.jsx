// // src/components/admin/PendingUserApproval.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "../../styles/manager/pua.module.css";

// const API_HOST = "http://localhost:3000/api";

// const PendingUserApproval = () => {
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

//   // 🔄 Fetch pending users
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.get(`${API_HOST}/users`, {
//         params: { status: "pending", search, sortBy, order, page, limit },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setUsers(res.data.users || []);
//       setTotalPages(res.data.totalPages || 1);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || "Failed to fetch pending users."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [search, sortBy, order, page, limit]);

//   // ✅ Approve user
//   const handleApprove = async (userId) => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.put(
//         `${API_HOST}/approve/${userId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setSelectedUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to approve user.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.header}>Pending User Approvals</h2>

//       {/* Search + Sort */}
//         <input
//           type="text"
//           placeholder="Search pending users..."
//           value={search}
//           id={styles.searchBar2}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//         />
//       <div className={styles.controls}>
//         <input
//           type="text"
//           placeholder="Search pending users..."
//           value={search}
//           id={styles.searchBar}
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
//       {loading && <p className={styles.loading}>Loading...</p>}
//       {error && <p className={styles.error}>{error}</p>}

//       {/* Pending User Cards */}
//       <div className={styles.userGrid}>
//         {!loading && users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user._id}
//               className={styles.userCard}
//               onClick={() => setSelectedUser(user)}
//             >
//               <div className={styles.cardHeader}>
//                 <h3>{user.name}</h3>
//                 <span className={styles.status}>{user.status}</span>
//               </div>
//               <p>{user.email}</p>
//               <p>{user.phone}</p>
//               <button
//                 className={styles.approveBtn}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleApprove(user._id);
//                 }}
//                 disabled={loading}
//               >
//                 {loading ? "Approving..." : "Approve"}
//               </button>
//             </div>
//           ))
//         ) : (
//           !loading && <p className={styles.empty}>No pending users found.</p>
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
//             <h3>User Details</h3>
//             <p>
//               <b>Name:</b> {selectedUser.name}
//             </p>
//             <p>
//               <b>Email:</b> {selectedUser.email}
//             </p>
//             <p>
//               <b>Phone:</b> {selectedUser.phone}
//             </p>
//             <p>
//               <b>Role:</b> {selectedUser.role}
//             </p>
//             <p>
//               <b>Status:</b> {selectedUser.status}
//             </p>
//             <p>
//               <b>Unique ID:</b> {selectedUser.uniqueIdCard}
//             </p>
//             <p>
//               <b>Membership:</b> {selectedUser.membership?.type || "-"} (
//               {selectedUser.membership?.status || "-"})
//             </p>
//             <p>
//               <b>Validity:</b>{" "}
//               {selectedUser.membership?.validity?.startDate || "-"} to{" "}
//               {selectedUser.membership?.validity?.endDate || "-"}
//             </p>
//             <div className={styles.modalActions}>
//               <button
//                 className={styles.approveBtn}
//                 onClick={() => handleApprove(selectedUser._id)}
//                 disabled={loading}
//               >
//                 {loading ? "Approving..." : "Approve"}
//               </button>
//               <button
//                 className={styles.cancelBtn}
//                 onClick={() => setSelectedUser(null)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingUserApproval;




//part 2
// src/components/admin/PendingUserApproval.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/manager/pua.module.css";

const API_HOST = "http://localhost:3000/api";

const PendingUserApproval = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);

  // 🔄 Fetch pending users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_HOST}/users`, {
        params: { status: "pending", search, sortBy, order, page, limit },
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
        err.response?.data?.message || "Failed to fetch pending users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, sortBy, order, page, limit]);

  // ✅ Approve user
  const handleApprove = async (userId) => {
    try {
      setLoading(true);
      setError("");

      await axios.put(
        `${API_HOST}/approve/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to approve user.");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Reject user
  const handleReject = async (userId) => {
    try {
      setLoading(true);
      setError("");

      await axios.delete(`${API_HOST}/reject/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to reject user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Pending User Approvals</h2>

      {/* Search + Sort */}
             <input
          type="text"
          placeholder="Search pending users..."
          value={search}
          id={styles.searchBar2}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search pending users..."
          value={search}
          id={styles.searchBar}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
 
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
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* Pending User Cards */}
      <div className={styles.userGrid}>
        {!loading && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className={styles.userCard}
              onClick={() => setSelectedUser(user)}
            >
              <div className={styles.cardHeader}>
                <h3>{user.name}</h3>
                <span className={styles.status}>{user.status}</span>
              </div>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <div className={styles.cardActions}>
                <button
                  className={styles.approveBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(user._id);
                  }}
                  disabled={loading}
                >
                  {loading ? "Approving..." : "Approve"}
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(user._id);
                  }}
                  disabled={loading}
                >
                  {loading ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className={styles.empty}>No pending users found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>User Details</h3>
            <p>
              <b>Name:</b> {selectedUser.name}
            </p>
            <p>
              <b>Email:</b> {selectedUser.email}
            </p>
            <p>
              <b>Phone:</b> {selectedUser.phone}
            </p>
            <p>
              <b>Role:</b> {selectedUser.role}
            </p>
            <p>
              <b>Status:</b> {selectedUser.status}
            </p>
            <p>
              <b>Unique ID:</b> {selectedUser.uniqueIdCard}
            </p>
            <p>
              <b>Membership:</b> {selectedUser.membership?.type || "-"} (
              {selectedUser.membership?.status || "-"})
            </p>
            <p>
              <b>Validity:</b>{" "}
              {selectedUser.membership?.validity?.startDate || "-"} to{" "}
              {selectedUser.membership?.validity?.endDate || "-"}
            </p>
            <div className={styles.modalActions}>
              <button
                className={styles.approveBtn}
                onClick={() => handleApprove(selectedUser._id)}
                disabled={loading}
              >
                {loading ? "Approving..." : "Approve"}
              </button>
              <button
                className={styles.rejectBtn}
                onClick={() => handleReject(selectedUser._id)}
                disabled={loading}
              >
                {loading ? "Rejecting..." : "Reject"}
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingUserApproval;

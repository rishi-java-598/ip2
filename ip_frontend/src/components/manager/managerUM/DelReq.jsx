// // components/DeleteUserRequests.jsx
// import React, { useEffect, useState } from "react";
// import styles from "./DeleteUserRequests.module.css";

// const DeleteUserRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("");
//   const [sortBy, setSortBy] = useState("createdAt");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [loading, setLoading] = useState(false);

//   const fetchRequests = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//   `http://localhost:3000/api/manager/get-member-delete-requests?page=${page}&limit=5&search=${search}&status=${status}&sortBy=${sortBy}&sortOrder=${sortOrder}`, 
//   {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT auth
//     },
//   }
// );

//       const data = await res.json();
//       console.log(data);
      
//       setRequests(data.data);
//       setTotalPages(data.totalPages);
//     } catch (err) {
//       console.error("Error fetching requests:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, [page, search, status, sortBy, sortOrder]);

//   return (
//     <div className={styles.container}>
//       <h2>Delete User Requests</h2>

//       {/* 🔎 Search + Filter + Sort */}
//       <div className={styles.controls}>
//         <input
//           type="text"
//           placeholder="Search by action/status"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />

//         <select value={status} onChange={(e) => {setStatus(e.target.value); setPage(1);}}>
//           <option value="">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="approved">Approved</option>
//           <option value="rejected">Rejected</option>
//         </select>

//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="createdAt">Created At</option>
//           <option value="status">Status</option>
//           <option value="action">Action</option>
//         </select>

//         <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//           <option value="desc">Descending</option>
//           <option value="asc">Ascending</option>
//         </select>
//       </div>

//       {/* 📋 Table */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : requests.length > 0 ? (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Email</th>
//               <th>Action</th>
//               <th>Status</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((r) => (
//               <tr key={r._id}>
//                 <td>{r.name || "—"}</td>
//                 <td>{r.email || "—"}</td>
//                 <td>{r.action}</td>
//                 <td>{r.status}</td>
//                 <td>{new Date(r.createdAt).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No requests found.</p>
//       )}

//       {/* 🔀 Pagination */}
//       <div className={styles.pagination}>
//         <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
//       </div>
//     </div>
//   ); 
// };

// export default DeleteUserRequests;
import { useEffect, useState } from "react";
import styles from "./DeleteUserRequests.module.css";

const DeleteUserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/manager/get-member-delete-requests?page=${page}&limit=5&search=${search}&status=${status}&sortBy=${sortBy}&sortOrder=${sortOrder}`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setRequests(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, search, status, sortBy, sortOrder]);

  return (
    <div className={styles.container}>
      <h2 style={{marginBottom:"10px"}}>Delete User Requests</h2>

      {/* 🔎 Controls */}
      <div className={styles.controls}>
        <input
          type="text"
          title="Search by name/email/action/status"
          placeholder="Search by name/email/action/status"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Created At</option>
          <option value="status">Status</option>
          <option value="action">Action</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* 📋 Cards */}
      {loading ? (
        <p style={{ display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    minHeight: "300px",
   }}>Loading...</p>
      ) : requests.length > 0 ? (
        <div className={styles.cardList}>
          {requests.map((r) => (
            <div key={r._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{r.name || "—"}</h3>
                <span className={`${styles.status} ${styles[r.status]}`}>
                  {r.status}
                </span>
              </div>
              <p><strong>Email:</strong> {r.email || "—"}</p>
              <p><strong>Action:</strong> {r.action}</p>
              <p><strong>Created:</strong> {new Date(r.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No requests found.</p>
      )}

      {/* 🔀 Pagination */}
      <div className={styles.pagination}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default DeleteUserRequests;


import { useEffect, useState } from "react";
import styles from "./DeleteUserRequests.module.css";

const AdminDeleteUserRequests = () => {
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
      console.log(data);
      
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

  
const handleApprove = async (requestId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/delete-member-request/${requestId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to approve request");

    alert("Request approved and user deleted.");
    fetchRequests(); // Refetch updated list
  } catch (err) {
    console.error("Approve error:", err);
    alert(`Error: ${err.message}`);
  }
};

const handleReject = async (requestId) => {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/reject-member-request/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to reject request");

    alert("Request rejected.");
    fetchRequests(); // Refetch updated list
  } catch (err) {
    console.error("Reject error:", err);
    alert(`Error: ${err.message}`);
  }
};

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
              {
              
                r.status==="pending" &&
              
              <div style={{display:"flex",gap:"10px",marginTop:"10px"}}>

                <button 
                onClick={() => handleApprove(r._id)}

                style={{
                  padding:"5px 10px",
                  backgroundColor:"#4CAF50",
                  color:"white",
                  border:"none",
                  borderRadius:"4px",
                  cursor:"pointer"
                }}>
                  
                  Approve</button>
                <button
                onClick={() => handleReject(r._id)}

                style={{
                  padding:"5px 10px",
                  backgroundColor:"#9f1616ff",
                  color:"white",
                  border:"none",
                  borderRadius:"4px",
                  cursor:"pointer"
                }}
                
                >Reject</button>
              </div>
}
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

export default AdminDeleteUserRequests;







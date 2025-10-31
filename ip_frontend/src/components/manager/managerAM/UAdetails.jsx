// import React, { useEffect, useState } from "react";
// import styles from "./ua.module.css";
// import { api } from "./api";

// const UserAttendanceDetail = ({ userId, onClose }) => {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (userId) load();
//   }, [userId, page]);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const res = await api.getMemberAttendance(userId, `?page=${page}&limit=10`);
//       setRecords(res.records || []);
//       setError(null);
//     } catch (err) {
//       console.error(err);
//       setError(err?.data?.message || "Failed to fetch attendance");
//       setRecords([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!userId) return null;

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <button className={styles.closeBtn} onClick={onClose}>×</button>
//         <h2>User Attendance Detail</h2>

//         {loading && <div>Loading...</div>}
//         {error && <div className={styles.error}>{error}</div>}

//         {!loading && records.length > 0 && (
//           <div className={styles.list}>
//             {records.map((r, idx) => (
//               <div key={idx} className={styles.recordCard}>
//                 <div><strong>Date:</strong> {new Date(r.date).toISOString().slice(0,10)}</div>
//                 <div><strong>Slot:</strong> {r.slot}</div>
//                 <div><strong>Marked At:</strong> {new Date(r.markedAt || r.date).toLocaleString()}</div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && records.length === 0 && !error && (
//           <div className={styles.empty}>No records found</div>
//         )}

//         {/* Pagination */}
//         <div className={styles.pager}>
//           <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
//           <span>Page {page}</span>
//           <button onClick={() => setPage(p => p + 1)}>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserAttendanceDetail;
import React, { useEffect, useState } from "react";
import styles from "./ua.module.css";
import { api } from "./api";

const UserAttendanceDetail = ({ userId, onClose }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Query states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [slot, setSlot] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Meta
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    load();
  }, [page, limit, sortBy, order, slot, startDate, endDate]);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        sortBy,
        order,
      });

      if (slot) params.append("slot", slot);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await api.getMemberAttendance(userId, `?${params.toString()}`);
      console.log(res);
      
      setRecords(res.records || []);
      setTotalPages(res.totalPages || 1);
      setTotalRecords(res.totalRecords || 0);
    } catch (err) {
      console.error("Error fetching member attendance:", err);
    }
    setLoading(false);
  };


  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>User Attendance</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Controls */}
        <div className={styles.filters}>
          <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div>
            <label>Slot:</label>
            <select value={slot} onChange={e => setSlot(e.target.value)}>
              <option value="">All</option>
              {Array.from({ length: 9 }).map((_, i) => (
                <option key={i+1} value={i+1}>Slot {i+1}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Sort By:</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="slot">Slot</option>
            </select>
            <select value={order} onChange={e => setOrder(e.target.value)}>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
          <div>
            <label>Limit:</label>
            <select value={limit} onChange={e => setLimit(e.target.value)}>
              {[5,10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Records */}
        <div className={styles.records}>
          {loading && <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Loading...</div>}
          {!loading && records.length === 0 && <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>No records found</div>}

          {!loading && records.map((r, idx) => (
            <div key={idx} className={styles.recordCard}>
              <div><strong>{new Date(r.date).toLocaleDateString()}</strong></div>
              <div>{r.slot}</div>
              {/* <div>Status: {r.status || "—"}</div> */}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
          <span>Page {page} of {totalPages} (Total {totalRecords})</span>
          <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default UserAttendanceDetail;

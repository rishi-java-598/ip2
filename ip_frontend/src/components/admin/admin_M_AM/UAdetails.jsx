// import { useEffect, useState } from "react";
// import styles from "./ua.module.css";
// import { api } from "./api";

// const UserAttendanceDetail = ({ userId, onClose }) => {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Query states
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [sortBy, setSortBy] = useState("date");
//   const [order, setOrder] = useState("desc");
//   const [slot, setSlot] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // Meta
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(0);

//   useEffect(() => {
//     load();
//   }, [page, limit, sortBy, order, slot, startDate, endDate]);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams({
//         page,
//         limit,
//         sortBy,
//         order,
//       });

//       if (slot) params.append("slot", slot);
//       if (startDate) params.append("startDate", startDate);
//       if (endDate) params.append("endDate", endDate);

//       const res = await api.getMemberAttendance(userId, `?${params.toString()}`);
//       console.log(res);
      
//       setRecords(res.records || []);
//       setTotalPages(res.totalPages || 1);
//       setTotalRecords(res.totalRecords || 0);
//     } catch (err) {
//       console.error("Error fetching member attendance:", err);
//     }
//     setLoading(false);
//   };


  

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <div className={styles.header}>
//           <h2>User Attendance</h2>
//           <button className={styles.closeBtn} onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         {/* Controls */}
//         <div className={styles.filters}>
//           <div>
//             <label>Start Date:</label>
//             <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
//           </div>
//           <div>
//             <label>End Date:</label>
//             <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
//           </div>
//           <div>
//             <label>Slot:</label>
//             <select value={slot} onChange={e => setSlot(e.target.value)}>
//               <option value="">All</option>
//               {Array.from({ length: 9 }).map((_, i) => (
//                 <option key={i+1} value={i+1}>Slot {i+1}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Sort By:</label>
//             <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
//               <option value="date">Date</option>
//               <option value="slot">Slot</option>
//             </select>
//             <select value={order} onChange={e => setOrder(e.target.value)}>
//               <option value="desc">Desc</option>
//               <option value="asc">Asc</option>
//             </select>
//           </div>
//           <div>
//             <label>Limit:</label>
//             <select value={limit} onChange={e => setLimit(e.target.value)}>
//               {[5,10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
//             </select>
//           </div>
//         </div>

//         {/* Records */}
//         <div className={styles.records}>
//           {loading && <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Loading...</div>}
//           {!loading && records.length === 0 && <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>No records found</div>}

//           {!loading && records.map((r, idx) => (
//             <div key={idx} className={styles.recordCard}>
//               <div><strong>{new Date(r.date).toLocaleDateString()}</strong></div>
//               <div>{r.slot}</div>
//               {/* <div>Status: {r.status || "—"}</div> */}
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className={styles.pagination}>
//           <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
//           <span>Page {page} of {totalPages} (Total {totalRecords})</span>
//           <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserAttendanceDetail;





import { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // ✅ import xlsx
import styles from "./ua.module.css";
import { api } from "./api";

const UserAttendanceDetail = ({ userId, onClose }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uname, setUname] = useState("");

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

      setUname(res.username || "");

      setRecords(res.records || []);
      setTotalPages(res.totalPages || 1);
      setTotalRecords(res.totalRecords || 0);
    } catch (err) {
      console.error("Error fetching member attendance:", err);
      // console.log(err.data.username);
      setUname(err.data.username || "___");  
    }
    setLoading(false);
  };

  // ✅ DOWNLOAD FUNCTION
  const downloadAttendance = () => {
    if (!records || records.length === 0) {
      alert("No attendance records to download.");
      return;
    }
    // console.log(userId,user);
    
    const data = records.map((r) => ({
      Date: new Date(r.date).toISOString().slice(0, 10),
      Slot: r.slot || "—",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, `IP_user_attendance_${userId}_${uname}_.xlsx`);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Member Attendance for {uname}</h2>
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
                <option key={i + 1} value={i + 1}>Slot {i + 1}</option>
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
            <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
              {[5, 10, 20, 50].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          
          </div>
             <div style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"flex-end"
             }}>
          <button
          
          style={{
            width:"100%",
              padding: "6px 2px",
  color: "white",
  background: "black",
  border: "1px solid #ddd",
  borderRadius: "12px",
  fontSize: "0.85rem",
          }}
          
          onClick={downloadAttendance}>
            📥 Download 
          </button>
        </div>
        </div>

        {/* ✅ Download Button */}
       

        {/* Records */}
        <div className={styles.records}>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              Loading...
            </div>
          )}
          {!loading && records.length === 0 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              No records found
            </div>
          )}

          {!loading && records.map((r, idx) => (
            <div key={idx} className={styles.recordCard}>
              <div><strong>{new Date(r.date).toLocaleDateString()}</strong></div>
              <div>Slot {r.slot}</div>
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

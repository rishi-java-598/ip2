
// import  { useState, useMemo } from "react";
// import styles from "./ad.module.css";
// import styles2 from "./style.module.css";

// const AttendanceDetail = ({ record, onClose }) => {
//   console.log(record);
  
//   const [search, setSearch] = useState("");
//   const [slotFilter, setSlotFilter] = useState("all");
//   const [page, setPage] = useState(1);
//   const pageSize = 5; // Number of members per page

//   if (!record) return null;

//   // Filtered Members
//   const filteredMembers = useMemo(() => {
//     let members = record.presentMembers || [];

//     if (slotFilter !== "all") {
//       members = members.filter((m) => String(m.slot) === String(slotFilter));
//     }

//     if (search.trim() !== "") {
//       const q = search.toLowerCase();
//       members = members.filter(
//         (m) =>
//           m.memberName.toLowerCase().includes(q) ||
//           (m.membershipType || "").toLowerCase().includes(q) ||
//           (m.uniqueIdCard || "").toLowerCase().includes(q)
//       );
//     }

//     return members;
//   }, [record.presentMembers, search, slotFilter]);

//   // Pagination
//   const totalPages = Math.ceil(filteredMembers.length / pageSize);
//   const paginatedMembers = filteredMembers.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   );

//   // Change page safely
//   const goToPage = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <button className={styles.closeBtn} onClick={onClose}>
//           ×
//         </button>

//         <h2>Attendance Detail</h2>

//         <div className={styles.section}>
//           <p><strong>Date:</strong> {new Date(record.date).toISOString().slice(0, 10)}</p>
//           <p><strong>Created At:</strong> {new Date(record.createdAt).toLocaleString()}</p>
//           <p><strong>Marked By:</strong> 
//             {record.markedBy?.name 
//               ? `${record.markedBy.name} (${record.markedBy.email || "—"})`
//               : record.markedBy || "—"}
//           </p>
//           <p><strong>Total Present:</strong> {(record.presentMembers || []).length}</p>
//         </div>

//         {/* Slot Counts */}
//         <div className={styles.section}>
//           <h3>Slot Counts</h3>
//           <div className={styles.slotGrid}>
//             {(record.slotCounts || []).map((count, idx) => (
//               <div key={idx} className={styles.slotCard}>
//                 <div className={styles.slotNum}>Slot {idx + 1}</div>
//                 <div className={styles.count}>{count} present</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Present Members */}
//         <div className={styles.section}>
//           <h3 style={{ marginBottom: "10px", marginRight: "10px", display: "inline-block" }}>
//             Present Members
//           </h3>

//           {/* Controls */}
//           <div className={styles.controls}>
//             <input
//               type="text"
//               placeholder="Search by name, membership, or ID"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1); // reset to first page when search changes
//               }}
//               className={styles.slotSearch}
//             />
//             <select
//             id={styles.slotSelect}
             
//               value={slotFilter}
//               onChange={(e) => {
//                 setSlotFilter(e.target.value);
//                 setPage(1); // reset to first page when filter changes
//               }}
//             >
//               <option value="all">All Slots</option>
//               {Array.from({ length: 9 }).map((_, i) => (
//                 <option key={i + 1} value={i + 1}>
//                   Slot {i + 1}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Members */}
//           <div className={styles.memberList}>
//             {paginatedMembers.length > 0 ? (
//               paginatedMembers.map((m, idx) => (
//                 <div key={idx} className={styles.memberRow}>
//                   <span className={styles.name}>{m.memberName}</span>
//                   <span className={styles.type}>{m.membershipType}</span>
//                   <span className={styles.slot}>Slot {m.slot}</span>
//                   <span className={styles.uid}>ID: {m.uniqueIdCard}</span>
//                   {m.markedBy && (
//                     <span className={styles.markedBy}>
//                       Marked By: {m.markedBy}
//                     </span>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className={styles.empty}>No members found</div>
//             )}
//           </div>

//           {/* Pagination Controls */}
//           {
//           // totalPages > 1 && 
//           (
//             <div className={styles2.pagination}>
//               <button
//                 disabled={page === 1}
//                 onClick={() => goToPage(page - 1)}
//               >
//                 Prev
//               </button>
//               <span>
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 disabled={page === totalPages}
//                 onClick={() => goToPage(page + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceDetail;




import  { useState, useMemo } from "react";
import * as XLSX from "xlsx"; // ✅ ADD THIS
import styles from "./ad.module.css";
import styles2 from "./style.module.css";
import { MdWorkHistory } from "react-icons/md";

const AttendanceDetail = ({ record, onClose }) => {
  const [search, setSearch] = useState("");
  const [slotFilter, setSlotFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  if (!record) return null;

  const filteredMembers = useMemo(() => {
    let members = record.presentMembers || [];

    if (slotFilter !== "all") {
      members = members.filter((m) => String(m.slot) === String(slotFilter));
    }

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      members = members.filter(
        (m) =>
          m.memberName.toLowerCase().includes(q) ||
          (m.membershipType || "").toLowerCase().includes(q) ||
          (m.uniqueIdCard || "").toLowerCase().includes(q)
      );
    }

    return members;
  }, [record.presentMembers, search, slotFilter]);

  const totalPages = Math.ceil(filteredMembers.length / pageSize);
  const paginatedMembers = filteredMembers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // ✅ DOWNLOAD FUNCTION
  const downloadExcel = () => {
    if (!record?.presentMembers || record.presentMembers.length === 0) {
      alert("No data to download.");
      return;
    }

    const data = (record.presentMembers || []).map((m) => ({
      Date: new Date(record.date).toISOString().slice(0, 10),
      Name: m.memberName,
      MembershipType: m.membershipType || "N/A",
      Slot: m.slot || "N/A",
      UniqueID: m.uniqueIdCard || "—",
      Email: m.memberEmail || "—",
      // MarkedBy: m.markedBy || "—",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const fileName = `IP_Attendance_${new Date(record.date)
      .toISOString()
      .slice(0, 10)}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2>Attendance Detail</h2>

        <div className={styles.section}>
          <p><strong>Date:</strong> {new Date(record.date).toISOString().slice(0, 10)}</p>
          <p><strong>Created At:</strong> {new Date(record.createdAt).toLocaleString()}</p>
          <p><strong>Marked By:</strong> 
            {record.markedBy?.name 
              ? `${record.markedBy.name} (${record.markedBy.email || "—"})`
              : record.markedBy || "—"}
          </p>
          <p><strong>Total Present:</strong> {(record.presentMembers || []).length}</p>
            <button className={styles2.sortButton}
            style={{padding:"4px 6px", background:"black",color:"white",margin:"4px 0"}}
            onClick={downloadExcel}>
            📥 Download Attendance
          </button>
        </div>

        <div className={styles.section}>
          <h3>Slot Counts</h3>
          <div className={styles.slotGrid}>
            {(record.slotCounts || []).map((count, idx) => (
              <div key={idx} className={styles.slotCard}>
                <div className={styles.slotNum}>Slot {idx + 1}</div>
                <div className={styles.count}>{count} present</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 style={{ marginBottom: "10px", marginRight: "10px", display: "inline-block" }}>
            Present Members
          </h3>

          {/* ✅ Download Button */}
          {/* <button className={styles2.sortButton} onClick={downloadExcel}>
            📥 Download Attendance
          </button> */}

          <div className={styles.controls}>
            <input
              type="text"
              placeholder="Search by name, membership, or ID"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className={styles.slotSearch}
            />
            <select
              id={styles.slotSelect}
              value={slotFilter}
              onChange={(e) => {
                setSlotFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All Slots</option>
              {Array.from({ length: 9 }).map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Slot {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.memberList}>
            {paginatedMembers.length > 0 ? (
              paginatedMembers.map((m, idx) => (
                <div key={idx} className={styles.memberRow}>
                  <span className={styles.name}>{m.memberName}</span>
                  <span className={styles.type}>{m.membershipType}</span>
                  <span className={styles.slot}>Slot {m.slot}</span>
                  <span className={styles.uid}>ID: {m.uniqueIdCard}</span>
                  {m.markedBy && (
                    <span className={styles.markedBy}>
                      Marked By: {m.markedBy}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.empty}>No members found</div>
            )}
          </div>

          {/* Pagination */}
          {(
            <div className={styles2.pagination}>
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetail;

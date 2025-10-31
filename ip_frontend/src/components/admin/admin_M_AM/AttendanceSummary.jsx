// //part 3:
// import React, { useMemo, useState } from 'react';
// import styles from './style.module.css';
// import styles2 from './ad.module.css';
// import { api } from './api';
// import { subMonths, format } from 'date-fns';

// const AttendanceSummary = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState(null);

//   const [slotSearch, setSlotSearch] = useState({});
//   const [slotPage, setSlotPage] = useState({});
//   const limit = 5;

//   // normalize start and end to midnight
//   const start = useMemo(() => {
//     const d = subMonths(new Date(), 3);
//     d.setHours(0, 0, 0, 0);
//     return d;
//   }, []);
//   const end = useMemo(() => {
//     const d = new Date();
//     d.setHours(0, 0, 0, 0);
//     return d;
//   }, []);

//   // generate days for large screen calendar
//   const days = useMemo(() => {
//     const arr = [];
//     for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//       arr.push(new Date(d));
//     }
//     return arr;
//   }, [start, end]);

//   const handleClickDate = async (dt) => {
//     const iso = dt.toISOString().slice(0, 10);
//     setSelectedDate(iso);
//     setSummary(null);
//     try {
//       const res = await api.getAttendanceSummary(iso);
//       setSummary(res);
//       setError(null);

//       // reset slot state
//       const initSearch = {};
//       const initPage = {};
//       Object.keys(res.slotSummary || {}).forEach((s) => {
//         initSearch[s] = '';
//         initPage[s] = 1;
//       });
//       setSlotSearch(initSearch);
//       setSlotPage(initPage);
//     } catch (err) {
//       setSummary(null);
//       setError(err?.data?.message || 'No data');
//     }
//   };

//   return (
//     <div className={styles.wrap}>
//       <h1>Attendance Summary by Date</h1>
//       <p>
//         Select a date between{' '}
//         <strong>{format(start, 'yyyy-MM-dd')}</strong> and{' '}
//         <strong>{format(end, 'yyyy-MM-dd')}</strong>
//       </p>

//       {/* Large screen calendar (default) */}
//       <div className={styles.calendar}>
//         {days.map((d, i) => (
//           <button
//             key={i}
//             className={styles.day}
//             onClick={() => handleClickDate(new Date(d))}
//           >
//             {format(new Date(d), 'yyyy-MM-dd')}
//           </button>
//         ))}
//       </div>

//       {/* Mobile date picker */}
//       <div className={styles.mobileSelector}>
//         <label>
//           Select Date:
//           <input
//           id={styles.dateInput}
//             type="date"
//             min={format(start, 'yyyy-MM-dd')}
//             max={format(end, 'yyyy-MM-dd')}
//             onChange={(e) => {
//               if (e.target.value) {
//                 handleClickDate(new Date(e.target.value));
//               }
//             }}
//           />
//         </label>
//       </div>

//       {/* Details */}
//       <div className={styles.details}>
//         {selectedDate && <h3>Selected: {selectedDate}</h3>}
//         {error && <div className={styles.error}>{error}</div>}
//         {summary && (
//           <div>
//             <div>Marked By: {summary.markedBy?.name || '—'}</div>
//             <div>Total Registered Members: {summary.totalMembers}</div>

//             <h4>Slot counts</h4>
//             <div className={styles2.slotGrid}>
//               {(summary.totalPresentPerSlot || []).map((c, idx) => (
//                 <div key={idx} className={styles.slotCard}>
//                   Slot {idx + 1}
//                   <br />
//                   {c} present
//                 </div>
//               ))}
//             </div>

//             <h4 style={{ margin: '10px 0px 10px 0px' }}>Slot details</h4>
//             {Object.keys(summary.slotSummary || {}).map((s) => {
//               const searchVal = slotSearch[s] || '';
//               const page = slotPage[s] || 1;

//               const members = summary.slotSummary[s] || [];
//               const filtered = members.filter(
//                 (m) =>
//                   m.name.toLowerCase().includes(searchVal.toLowerCase()) ||
//                   (m.membershipType || '')
//                     .toLowerCase()
//                     .includes(searchVal.toLowerCase())
//               );

//               const totalPages = Math.ceil(filtered.length / limit) || 1;
//               const startIdx = (page - 1) * limit;
//               const paginated = filtered.slice(startIdx, startIdx + limit);

//               return (
//                 <div key={s} className={styles.slotList}>
//                   <h5 style={{ marginBottom: '5px', marginRight: '10px' }}>
//                     Slot {s}
//                   </h5>

//                   <input
//                     className={styles.slotSearch}
//                     type="text"
//                     placeholder="Search members..."
//                     value={searchVal}
//                     onChange={(e) => {

//                     setSlotSearch((prev) => ({
//                         ...prev,
//                         [s]: e.target.value,
//                       }));
//                       setSlotPage((prev) => ({ ...prev, [s]: 1 }));
//                     }}
//                   />

//                   {paginated.length > 0 ? (
//                     paginated.map((m, i) => (
//                       <div key={i} className={styles.memberRow}>
//                         {m.name} — {m.membershipType}
//                       </div>
//                     ))
//                   ) : (
//                     <div className={styles.empty}>No members found</div>
//                   )}

//                   <div className={styles.pagination}>
//                     <button
//                       disabled={page <= 1}
//                       onClick={() =>
//                         setSlotPage((prev) => ({ ...prev, [s]: prev[s] - 1 }))
//                       }
//                     >
//                       Prev
//                     </button>
//                     <span>
//                       Page {page} of {totalPages}
//                     </span>
//                     <button
//                       disabled={page >= totalPages}
//                       onClick={() =>
//                         setSlotPage((prev) => ({ ...prev, [s]: prev[s] + 1 }))
//                       }
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceSummary;




// AttendanceSummary.jsx
import React, { useMemo, useState } from 'react';
import styles from './style.module.css';
import styles2 from './ad.module.css';
import { api } from './api';
import { subMonths, format } from 'date-fns';
import * as XLSX from 'xlsx';

const AttendanceSummary = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const [slotSearch, setSlotSearch] = useState({});
  const [slotPage, setSlotPage] = useState({});
  const limit = 5;

  const start = useMemo(() => {
    const d = subMonths(new Date(), 3);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const end = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const days = useMemo(() => {
    const arr = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      arr.push(new Date(d));
    }
    return arr;
  }, [start, end]);

  const handleClickDate = async (dt) => {
    const iso = dt.toISOString().slice(0, 10);
    setSelectedDate(iso);
    setSummary(null);
    try {
      const res = await api.getAttendanceSummary(iso);
      setSummary(res);
      // console.log(res);
      
      setError(null);

      const initSearch = {};
      const initPage = {};
      Object.keys(res.slotSummary || {}).forEach((s) => {
        initSearch[s] = '';
        initPage[s] = 1;
      });
      setSlotSearch(initSearch);
      setSlotPage(initPage);
    } catch (err) {
      setSummary(null);
      setError(err?.data?.message || 'No data');
    }
  };





const downloadCSV = () => {
  if (!summary || !summary.slotSummary) return;

  const allData = [];

  Object.entries(summary.slotSummary).forEach(([slot, members]) => {
    members.forEach((member) => {
      allData.push({
        Date: selectedDate, // Use as string to avoid timezone bugs
        Slot: slot,
        Name: member.name,
        Email:member.email,
        uniqueIdCard:member.uniqueIdCard,
        MembershipType: member.membershipType || 'N/A',
      });
    });
  });

  if (allData.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(allData);

  worksheet['!cols'] = [
    { wch: 15 }, // Date
    { wch: 6 },  // Slot
    { wch: 20 }, // Name
    { wch: 20 }, // MembershipType
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

  // Use .xlsx even if named .csv, for better formatting
  XLSX.writeFile(workbook, `IP_Attendance-${selectedDate}.xlsx`);
};

  // const downloadCSV = () => {
  //   if (!summary || !summary.slotSummary) return;

  //   const allData = [];

  //   Object.entries(summary.slotSummary).forEach(([slot, members]) => {
  //     members.forEach((member) => {
  //       console.log(selectedDate);
        
  //       allData.push({
  //         Date: new Date(selectedDate),
  //         Slot: slot,
  //         Name: member.name,
  //         MembershipType: member.membershipType || 'N/A',
  //       });
  //     });
  //   });

  //   if (allData.length === 0) return;

  //   const worksheet = XLSX.utils.json_to_sheet(allData);
  //   const workbook = XLSX.utils.book_new();
  //   console.log(workbook);
    
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
  //   XLSX.writeFile(workbook, `attendance-${selectedDate}.csv`, { bookType: 'csv' });
  // };
// const downloadCSV = () => {
//   if (!summary || !summary.slotSummary) return;

//   const allData = [];

//   Object.entries(summary.slotSummary).forEach(([slot, members]) => {
//     members.forEach((member) => {
//       allData.push({
//         Date: new Date(selectedDate), // Pass as actual Date object
//         Slot: slot,
//         Name: member.name,
//         MembershipType: member.membershipType || 'N/A',
//       });
//     });
//   });

//   if (allData.length === 0) return;

//   const worksheet = XLSX.utils.json_to_sheet(allData);

//   // Apply column formatting — set Date column format explicitly
//   const wscols = [
//     { wch: 15 }, // Date
//     { wch: 6 },  // Slot
//     { wch: 20 }, // Name
//     { wch: 20 }, // MembershipType
//   ];
//   worksheet['!cols'] = wscols;

//   // Format 'Date' column as Excel date
//   allData.forEach((row, i) => {
//     const cellRef = `A${i + 2}`; // skip header row
//     if (worksheet[cellRef]) {
//       worksheet[cellRef].t = 'd'; // 'd' means date type
//       worksheet[cellRef].z = XLSX.SSF._table[14]; // apply standard date format (m/d/yy)
//     }
//   });

//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
//   XLSX.writeFile(workbook, `attendance-${selectedDate}.xlsx`);
// };

  return (
    <div className={styles.wrap}>
      <h1>Attendance Summary by Date</h1>
      <p>
        Select a date between{' '}
        <strong>{format(start, 'yyyy-MM-dd')}</strong> and{' '}
        <strong>{format(end, 'yyyy-MM-dd')}</strong>
      </p>

      {/* Large screen calendar */}
      <div className={styles.calendar}>
        {days.map((d, i) => (
          <button
            key={i}
            className={styles.day}
            onClick={() => handleClickDate(new Date(d))}
          >
            {format(new Date(d), 'yyyy-MM-dd')}
          </button>
        ))}
      </div>

      {/* Mobile date picker */}
      <div className={styles.mobileSelector}>
        <label>
          Select Date:
          <input
            id={styles.dateInput}
            type="date"
            min={format(start, 'yyyy-MM-dd')}
            max={format(end, 'yyyy-MM-dd')}
            onChange={(e) => {
              if (e.target.value) {
                handleClickDate(new Date(e.target.value));
              }
            }}
          />
        </label>
      </div>

      {/* Details */}
      <div className={styles.details}>
        {selectedDate && <h3>Selected: {selectedDate}</h3>}
        {error && <div className={styles.error}>{error}</div>}

        {summary && (
          <div>
            <button
              onClick={downloadCSV}
              style={{
                margin: '10px 0px',
                padding: '6px 12px',
                backgroundColor: '#222222ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Download CSV
            </button>

            <div>Marked By: {summary.markedBy?.name || '—'}</div>
            <div>Total Registered Members: {summary.totalMembers}</div>

            <h4>Slot counts</h4>
            <div className={styles2.slotGrid}>
              {(summary.totalPresentPerSlot || []).map((c, idx) => (
                <div key={idx} className={styles.slotCard}>
                  Slot {idx + 1}
                  <br />
                  {c} present
                </div>
              ))}
            </div>

            <h4 style={{ margin: '10px 0px 10px 0px' }}>Slot details</h4>
            {Object.keys(summary.slotSummary || {}).map((s) => {
              const searchVal = slotSearch[s] || '';
              const page = slotPage[s] || 1;

              const members = summary.slotSummary[s] || [];
              const filtered = members.filter(
                (m) =>
                  m.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                  (m.membershipType || '')
                    .toLowerCase()
                    .includes(searchVal.toLowerCase())
              );

              const totalPages = Math.ceil(filtered.length / limit) || 1;
              const startIdx = (page - 1) * limit;
              const paginated = filtered.slice(startIdx, startIdx + limit);

              return (
                <div key={s} className={styles.slotList}>
                  <h5 style={{ marginBottom: '5px', marginRight: '10px' }}>
                    Slot {s}
                  </h5>

                  <input
                    className={styles.slotSearch}
                    type="text"
                    placeholder="Search members..."
                    value={searchVal}
                    onChange={(e) => {
                      setSlotSearch((prev) => ({
                        ...prev,
                        [s]: e.target.value,
                      }));
                      setSlotPage((prev) => ({ ...prev, [s]: 1 }));
                    }}
                  />

                  {paginated.length > 0 ? (
                    paginated.map((m, i) => (
                      <div key={i} className={styles.memberRow}>
                        {m.name} — {m.membershipType}
                      </div>
                    ))
                  ) : (
                    <div className={styles.empty}>No members found</div>
                  )}

                  <div className={styles.pagination}>
                    <button
                      disabled={page <= 1}
                      onClick={() =>
                        setSlotPage((prev) => ({
                          ...prev,
                          [s]: prev[s] - 1,
                        }))
                      }
                    >
                      Prev
                    </button>
                    <span>
                      Page {page} of {totalPages}
                    </span>
                    <button
                      disabled={page >= totalPages}
                      onClick={() =>
                        setSlotPage((prev) => ({
                          ...prev,
                          [s]: prev[s] + 1,
                        }))
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceSummary;

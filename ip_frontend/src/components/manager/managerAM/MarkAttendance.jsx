// import React, { useEffect, useMemo, useState } from 'react';
// import styles from './style.module.css';
// import { api } from './api';

// // Simple util to format date as yyyy-mm-dd
// const toISODate = (d = new Date()) => d.toISOString().slice(0,10);

// const MarkAttendance = () => {
//   const today = toISODate(new Date());
//   const [allUsers, setAllUsers] = useState([]);
//   const [leftMarked, setLeftMarked] = useState([]); // already marked for today in UI
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   useEffect(()=>{
//     loadUsers();
//     loadTodaySummary();
//   },[]);

//   const loadUsers = async ()=>{
//     setLoading(true);
//     try{
//       const res = await api.getUsers('?role=member&limit=500');
//       setAllUsers(res.users || res.data || []);
//     }catch(err){
//       console.error(err);
//       setAllUsers([]);
//     }finally{ setLoading(false); }
//   };

//   const loadTodaySummary = async ()=>{
//     try{
//       const res = await api.getAttendanceSummary(today);
//       // transform presentMembers to leftMarked
//       const arr = [];
//       Object.keys(res.slotSummary || {}).forEach(slot => {
//         (res.slotSummary[slot] || []).forEach(m => {
//           arr.push({ memberId: m.memberId || null, memberName: m.name || m.memberName, membershipType: m.membershipType, uniqueIdCard: m.uniqueIdCard, slot: Number(slot) });
//         });
//       });
//       setLeftMarked(arr);
//     }catch(err){
//       // likely 404 if no attendance exists yet
//       setLeftMarked([]);
//     }
//   };

//   // right column users = members not present in leftMarked
//   const unmarkedUsers = useMemo(()=>{
//     const markedIds = new Set(leftMarked.map(m => String(m.memberId)||m.uniqueIdCard));
//     return allUsers.filter(u => !markedIds.has(String(u._id)) && (u.role==='member'))
//       .filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))
//       .slice(0, 120);
//   }, [allUsers, leftMarked, query]);

//   const handleMarkPresent = (user)=>{
//     // prompt slot selection
//     const slotStr = prompt('Enter slot number (1-9) for ' + user.name, '1');
//     const slot = Number(slotStr);
//     if (!slot || slot < 1 || slot > 9) return alert('Invalid slot');
//     const newItem = { memberId: user._id, memberName: user.name, membershipType: user.membership?.type || user.membershipType || '', uniqueIdCard: user.uniqueIdCard||'', slot };
//     setLeftMarked(prev => [...prev, newItem]);
//   };

//   const handleRemoveLeft = (index)=>{
//     setLeftMarked(prev => prev.filter((_,i)=>i!==index));
//   };

//   const handleSave = async ()=>{
//     if (leftMarked.length===0) return alert('No members marked');
//     // group by slot and prepare members array according to backend expectation
//     const members = leftMarked.map(m => ({ memberId: m.memberId, memberName: m.memberName, membershipType: m.membershipType, uniqueIdCard: m.uniqueIdCard, slot: m.slot }));
//     const body = { date: today, slot: 0, members }; // slot top-level isn't needed per-member, but backend expects slot param; we set 0 as placeholder
//     setSaving(true);
//     try{
//       const res = await api.markAttendance(body);
//       alert('Saved successfully');
//       // reload
//       loadTodaySummary();
//       loadUsers();
//     }catch(err){
//       console.error(err);
//       alert(err?.data?.message || 'Failed to save');
//     }finally{ setSaving(false); }
//   };

//   return (
//     <div className={styles.wrap}>
//       <h1>Mark Today's Attendance</h1>
//       <div className={styles.cols}>
//         <section className={styles.left}>
//           <h3>Marked Members ({leftMarked.length})</h3>
//           <div className={styles.cards}>
//             {leftMarked.map((m, idx)=> (
//               <div key={idx} className={styles.card}>
//                 <div>
//                   <strong>{m.memberName}</strong>
//                   <div className={styles.muted}>{m.membershipType}</div>
//                   <div className={styles.slot}>Slot: {m.slot}</div>
//                 </div>
//                 <div>
//                   <button className={styles.remove} onClick={()=>handleRemoveLeft(idx)}>Remove</button>
//                 </div>
//               </div>
//             ))}
//             {leftMarked.length===0 && <div className={styles.empty}>No members marked for today.</div>}
//           </div>
//           <div className={styles.saveRow}>
//             <button onClick={handleSave} disabled={saving}>{saving? 'Saving...' : 'Save Today Attendance'}</button>
//           </div>
//         </section>

//         <aside className={styles.right}>
//           <h3>Search Members</h3>
//           <input placeholder="Search by name or email" value={query} onChange={e=>setQuery(e.target.value)} />
//           <div className={styles.resultList}>
//             {loading && <div>Loading users...</div>}
//             {!loading && unmarkedUsers.length===0 && <div className={styles.empty}>No users found</div>}
//             {unmarkedUsers.map(u => (
//               <div className={styles.resultCard} key={u._id}>
//                 <div>
//                   <strong>{u.name}</strong>
//                   <div className={styles.muted}>{u.email}</div>
//                   <div className={styles.muted}>Membership: {u.membership?.type || u.membershipType || '—'}</div>
//                 </div>
//                 <div>
//                   <button onClick={()=>handleMarkPresent(u)}>Mark Present</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default MarkAttendance;























// //part 2
// import React, { useEffect, useMemo, useState } from 'react';
// import styles from './style.module.css';
// import { api } from './api';

// // utility: yyyy-mm-dd
// // const toISODate = (d = new Date()) => d.toISOString().slice(0, 10);
// // utility: yyyy-mm-dd in LOCAL timezone
// // const toISODate = (d = new Date()) => {
// //   const year = d.getFullYear();
// //   const month = String(d.getMonth() + 1).padStart(2, '0');
// //   const day = String(d.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };
// // utility: yyyy-mm-dd in LOCAL timezone

// const toISODate = (d = new Date()) => {
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// const MarkAttendance = () => {
//   const today = toISODate(new Date());
//   console.log(today);
  
//   const [allUsers, setAllUsers] = useState([]);
//   const [markedToday, setMarkedToday] = useState([]); // already marked today
//   const [query, setQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     loadUsers();
//     loadToday();
//   }, []);

//   const loadUsers = async () => {
//     setLoading(true);
//     try {
//     //   const res = await api.getUsers('?role=member&limit=500');
//     const res = await api.getUsers('?role=member&limit=500&membershipStatus=active');

//       setAllUsers(res.users || res.data || []);
//     } catch (err) {
//       console.error(err);
//       setAllUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadToday = async () => {
//     try {
//       const res = await api.getTodayAttendance(today);
//       setMarkedToday(res.presentMembers || []);
//     } catch (err) {
//       // likely 404 if no attendance exists yet
//       setMarkedToday([]);
//     }
//   };

//   // unmarked users = allUsers - markedToday
//   const unmarkedUsers = useMemo(() => {
//     const markedIds = new Set(markedToday.map(m => String(m.memberId) || m.uniqueIdCard));
//     return allUsers
//       .filter(u => !markedIds.has(String(u._id)) && u.role === 'member')
//       .filter(
//         u =>
//           u.name.toLowerCase().includes(query.toLowerCase()) ||
//           u.email.toLowerCase().includes(query.toLowerCase())
//       )
//       .slice(0, 120);
//   }, [allUsers, markedToday, query]);

//   const handleMarkPresent = user => {
//     const slotStr = prompt('Enter slot number (1-9) for ' + user.name, '1');
//     const slot = Number(slotStr);
//     if (!slot || slot < 1 || slot > 9) return alert('Invalid slot');

//     const newMember = {
//       memberId: user._id,
//       memberName: user.name,
//       membershipType: user.membership?.type || '',
//       uniqueIdCard: user.uniqueIdCard || '',
//       slot,
//     };

//     setMarkedToday(prev => [...prev, newMember]);
//   };

//   const handleRemove = async member => {
//     if (!window.confirm(`Remove ${member.memberName} from today's attendance?`)) return;
//     try {
//       await api.deleteMemberFromToday({ date: today, memberId: member.memberId });
//       loadToday();
//     } catch (err) {
//       console.error(err);
//       alert(err?.data?.message || 'Failed to remove');
//     }
//   };

//   const handleUpdateSlot = async member => {
//     const newSlotStr = prompt(`Enter new slot (1-9) for ${member.memberName}`, member.slot);
//     const newSlot = Number(newSlotStr);
//     if (!newSlot || newSlot < 1 || newSlot > 9) return alert('Invalid slot');
//     try {
//       await api.updateMemberSlot({ date: today, memberId: member.memberId, newSlot });
//       loadToday();
//     } catch (err) {
//       console.error(err);
//       alert(err?.data?.message || 'Failed to update slot');
//     }
//   };

//   const handleSave = async () => {
//     // filter only new marks (those without _id in DB yet)
//     const newMembers = markedToday.filter(m => !allUsers.some(u => u._id === m.memberId && m._id));
//     if (newMembers.length === 0) return alert('No new members to save');

//     const members = newMembers.map(m => ({
//       memberId: m.memberId,
//       memberName: m.memberName,
//       membershipType: m.membershipType,
//       uniqueIdCard: m.uniqueIdCard,
//       slot: m.slot,
//     }));

//     const body = { date: today, members };

//     setSaving(true);
//     try {
//       await api.markAttendance(body);
//       alert('Saved successfully');
//       loadToday();
//       loadUsers();
//     } catch (err) {
//       console.error(err);
//       alert(err?.data?.message || 'Failed to save');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className={styles.wrap}>
//       <h1>Mark Today's Attendance</h1>
//       <div className={styles.cols}>
//         <section className={styles.left}>
//           <h3 style={{marginBottom:"10px"}}>Marked Members ({markedToday.length})</h3>
//           <div className={styles.cards}>
//             {markedToday.map((m, idx) => (
//               <div key={idx} className={styles.card}>
//                 <div>
//                   <strong>{m.memberName}</strong>
//                   <div className={styles.muted}>{m.membershipType}</div>
//                   <div className={styles.slot}>Slot: {m.slot}</div>
//                 </div>
//                 <div className={styles.actions}>
//                   <button className={styles.editBTN} onClick={() => handleUpdateSlot(m)}>Edit Slot</button>
//                   <button className={styles.remove} onClick={() => handleRemove(m)}>
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//             {markedToday.length === 0 && (
//               <div className={styles.empty}>No members marked for today.</div>
//             )}
//           </div>
//           <div className={styles.saveRow}>
//             <button onClick={handleSave} disabled={saving}>
//               {saving ? 'Saving...' : 'Save New Marks'}
//             </button>
//           </div>
//         </section>

//         <aside className={styles.right}>
//           <h3 id={styles.smHead}>Search Members</h3>
//           <input
//           id={styles.searchMem}
//             placeholder="Search by name or email"
//             value={query}
//             onChange={e => setQuery(e.target.value)}
//           />
//           <div className={styles.resultList}>
//             {loading && <div>Loading users...</div>}
//             {!loading && unmarkedUsers.length === 0 && (
//               <div className={styles.empty}>No users found</div>
//             )}
//             {unmarkedUsers.map(u => (
//               <div className={styles.resultCard} key={u._id}>
//                 <div>
//                   <strong>{u.name}</strong>
//                   <div className={styles.muted}>{u.email}</div>
//                   <div className={styles.muted}>
//                     Membership: {u.membership?.type || '—'}
//                   </div>
//                 </div>
//                 <div>
//                   <button onClick={() => handleMarkPresent(u)}>Mark Present</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default MarkAttendance;










//part 3
// import { useEffect, useMemo, useState } from 'react';
// import styles from './style.module.css';
// import { MdDelete } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";

// import { api } from './api';

// // utility: yyyy-mm-dd in LOCAL timezone
// const toISODate = (d = new Date()) => {
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, '0');
//   const day = String(d.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// const MarkAttendance = () => {
//   const today = toISODate(new Date());

//   const [allUsers, setAllUsers] = useState([]);
//   const [markedToday, setMarkedToday] = useState([]); // already marked today

//   // search queries
//   const [markedQuery, setMarkedQuery] = useState('');
//   const [unmarkedQuery, setUnmarkedQuery] = useState('');

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   // pagination states
//   const [markedPage, setMarkedPage] = useState(1);
//   const [unmarkedPage, setUnmarkedPage] = useState(1);
//   const limit = 5;

//   useEffect(() => {
//     loadUsers();
//     loadToday();
//   }, []);

//   const loadUsers = async () => {
//     setLoading(true);
//     try {
//       const res = await api.getUsers('?role=member&limit=500&membershipStatus=active');
//       setAllUsers(res.users || res.data || []);
//     } catch (err) {
//       console.error(err);
//       setAllUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadToday = async () => {
//     try {
//       const res = await api.getTodayAttendance(today);
//       setMarkedToday(res.presentMembers || []);
//     } catch (err) {
//       setMarkedToday([]);
//     }
//   };

//   // unmarked users = allUsers - markedToday
//   const unmarkedUsers = useMemo(() => {
//     const markedIds = new Set(markedToday.map(m => String(m.memberId) || m.uniqueIdCard));
//     return allUsers
//       .filter(u => !markedIds.has(String(u._id)) && u.role === 'member')
//       .filter(
//         u =>
//           u.name.toLowerCase().includes(unmarkedQuery.toLowerCase()) ||
//           u.email.toLowerCase().includes(unmarkedQuery.toLowerCase())
//       );
//   }, [allUsers, markedToday, unmarkedQuery]);

//   // filtered marked
//   const filteredMarked = useMemo(() => {
//     return markedToday.filter(
//       m =>
//         m.memberName.toLowerCase().includes(markedQuery.toLowerCase()) ||
//         (m.membershipType || '').toLowerCase().includes(markedQuery.toLowerCase())
//     );
//   }, [markedToday, markedQuery]);

//   // paginated marked
//   const paginatedMarked = useMemo(() => {
//     const start = (markedPage - 1) * limit;
//     return filteredMarked.slice(start, start + limit);
//   }, [filteredMarked, markedPage]);

//   // paginated unmarked
//   const paginatedUnmarked = useMemo(() => {
//     const start = (unmarkedPage - 1) * limit;
//     return unmarkedUsers.slice(start, start + limit);
//   }, [unmarkedUsers, unmarkedPage]);

//   const handleMarkPresent = user => {
//     const slotStr = prompt('Enter slot number (1-9) for ' + user.name, '1');
//     const slot = Number(slotStr);
//     if (!slot || slot < 1 || slot > 9) return alert('Invalid slot');

//     const newMember = {
//       memberId: user._id,
//       memberName: user.name,
//             memberEmail: user.email || '',

//       membershipType: user.membership?.type || '',
//       uniqueIdCard: user.uniqueIdCard || '',
//       slot,
//     };

//     setMarkedToday(prev => [...prev, newMember]);
//   };

//   // const handleRemove = async member => {
//   //   if (!window.confirm(`Remove ${member.memberName} from today's attendance?`)) return;
//   //   try {
//   //     await api.deleteMemberFromToday({ date: today, memberId: member.memberId });
//   //     loadToday();
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert(err?.data?.message || 'Failed to remove');
//   //   }
//   // };

  
//     const handleRemove = async member => {
//     // Check for unsaved members before allowing delete
//     const unsavedMembers = markedToday.filter(m => !m._id);
//     if (unsavedMembers.length > 0) {
//       alert('Save unmarked users first');
//       return;
//     }
  
//     if (!window.confirm(`Remove ${member.memberName} from today's attendance?`)) return;
//     try {
//       await api.deleteMemberFromToday({ date: today, memberId: member.memberId });
//       loadToday();
//     } catch (err) {
//       console.error(err);
//       alert(err?.data?.message || 'Failed to remove');
//     }
//   };
  

//   const handleUpdateSlot = async member => {
//     const newSlotStr = prompt(`Enter new slot (1-9) for ${member.memberName}`, member.slot);
//     const newSlot = Number(newSlotStr);
//     if (!newSlot || newSlot < 1 || newSlot > 9) return alert('Invalid slot');
//     try {
//       await api.updateMemberSlot({ date: today, memberId: member.memberId, newSlot });
//       loadToday();
//     } catch (err) {
//       console.error(err);
//       alert(err?.data?.message || 'Failed to update slot');
//     }
//   };

//   const handleSave = async () => {
//     const newMembers = markedToday.filter(m => !allUsers.some(u => u._id === m.memberId && m._id));
//     if (newMembers.length === 0) return alert('No new members to save');

//     const members = newMembers.map(m => ({
//       memberId: m.memberId,
//             memberEmail: m.memberEmail,

//       memberName: m.memberName,
//       membershipType: m.membershipType,
//       uniqueIdCard: m.uniqueIdCard,
//       slot: m.slot,
//     }));

//     const body = { date: today, members };

//     setSaving(true);
//     try {
//       await api.markAttendance(body);
//       alert('Saved successfully');
//       loadToday();
//       loadUsers();
//     } catch (err) {
//       console.error(err);
//       alert(err?.data?.message || 'Failed to save');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // total pages
//   const markedTotalPages = Math.ceil(filteredMarked.length / limit) || 1;
//   const unmarkedTotalPages = Math.ceil(unmarkedUsers.length / limit) || 1;

//   return (
//     <div className={styles.wrap}>
//       <h1>Mark Today's Attendance</h1>
//       <div className={styles.cols}>
//         {/* ---- MARKED MEMBERS ---- */}
//         <section className={styles.left}>
//           <h3 style={{ marginBottom: '10px' }}>
//             Marked Members ({markedToday.length})
//           </h3>

//           {/* search bar for marked */}
//           <input
//             id={styles.searchMem}
//             style={{marginBottom:"10px"}}
//             placeholder="Search marked members"
//             value={markedQuery}
//             onChange={e => {
//               setMarkedQuery(e.target.value);
//               setMarkedPage(1); // reset to first page
//             }}
//           />

//           <div className={styles.cards}>
//             {paginatedMarked.map((m, idx) => (
//               <div key={idx} className={styles.card}>
//                 <div>
//                   <strong>{m.memberName}</strong>
//                   <div className={styles.muted}>{m.membershipType}</div>
//                   <div className={styles.slot}>Slot: {m.slot}</div>
//                 </div>
//                 <div className={styles.actions}>
//                   <button className={styles.editBTN} onClick={() => handleUpdateSlot(m)}>
//                     {/* Edit Slot  */}
//                   <span id={styles.editIcon}><CiEdit /></span>
//                     </button>
//                   <button className={styles.remove} onClick={() => handleRemove(m)}>
//                     {/* Remove  */}
//                     <span id={styles.removeIcon}><MdDelete /></span>
//                     </button>
//                 </div>
//               </div>
//             ))}
//             {filteredMarked.length === 0 && (
//               <div className={styles.empty}>No marked members match your search.</div>
//             )}
//           </div>

//           {/* pagination for marked */}
//           <div className={styles.pagination}>
//             <button
//               disabled={markedPage <= 1}
//               onClick={() => setMarkedPage(p => p - 1)}
//             >
//               Prev
//             </button>
//             <span>
//               Page {markedPage} of {markedTotalPages}
//             </span>
//             <button
//               disabled={markedPage >= markedTotalPages}
//               onClick={() => setMarkedPage(p => p + 1)}
//             >
//               Next
//             </button>
//           </div>

//           <div className={styles.saveRow}>
//             <button onClick={handleSave} disabled={saving} id={styles.saveBtn}>
//               {saving ? 'Saving...' : 'Save New Marks'}
//             </button>
//           </div>
//         </section>

//         {/* ---- UNMARKED MEMBERS ---- */}
//         <aside className={styles.right}>
//           <h3 id={styles.smHead}>Search Members</h3>
//           <input
//             id={styles.searchMem}
//             placeholder="Search unmarked members"
//             value={unmarkedQuery}
//             onChange={e => {
//               setUnmarkedQuery(e.target.value);
//               setUnmarkedPage(1); // reset to first page
//             }}
//           />
//           <div className={styles.resultList}>
//             {loading && <div style={{minHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center"}}>Loading users...</div>}
//             {!loading && paginatedUnmarked.length === 0 && (
//               <div className={styles.empty}>No users found</div>
//             )}
//             {paginatedUnmarked.map(u => (
//               <div className={styles.resultCard} key={u._id}>
//                 <div>
//                   <strong>{u.name}</strong>
//                   <div className={styles.muted}>{u.email}</div>
//                   <div className={styles.muted}>
//                     Membership: {u.membership?.type || '—'}
//                   </div>
//                 </div>
//                 <div>
//                   <button id={styles.markBTN} onClick={() => handleMarkPresent(u)}>Mark</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* pagination for unmarked */}
//           <div className={styles.pagination}>
//             <button
//               disabled={unmarkedPage <= 1}
//               onClick={() => setUnmarkedPage(p => p - 1)}
//             >
//               Prev
//             </button>
//             <span>
//               Page {unmarkedPage} of {unmarkedTotalPages}
//             </span>
//             <button
//               disabled={unmarkedPage >= unmarkedTotalPages}
//               onClick={() => setUnmarkedPage(p => p + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default MarkAttendance;







//part 3
import {  useEffect, useMemo, useState } from 'react';
import styles from './style.module.css';
import styles2 from '../../admin/admin_M_AM/modal.module.css'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { api } from './api';

// utility: yyyy-mm-dd in LOCAL timezone
const toISODate = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const MarkAttendance = () => {
  const today = toISODate(new Date());

  const [modal,setModal] = useState('');
  const [modalMessage,setModalMessage] = useState('');
  const [islot,setIslot] = useState('');
  const [slotError,setslotError] = useState('');
  const [selectedUSer,setSelectedUser] = useState(null);
  const [selectedEditUSer,setSelectedEditUSer] = useState(null);
  const [selectedDeleteUSer,setSelectedDeleteUSer] = useState(null);



  const [allUsers, setAllUsers] = useState([]);
  const [markedToday, setMarkedToday] = useState([]); // already marked today

  // search queries
  const [markedQuery, setMarkedQuery] = useState('');
  const [unmarkedQuery, setUnmarkedQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // pagination states
  const [markedPage, setMarkedPage] = useState(1);
  const [unmarkedPage, setUnmarkedPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    loadUsers();
    loadToday();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.getUsers('?role=member&limit=500&membershipStatus=active');
      setAllUsers(res.users || res.data || []);
    } catch (err) {
      console.error(err);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadToday = async () => {
    try {
      const res = await api.getTodayAttendance(today);
      setMarkedToday(res.presentMembers || []);
    } catch (err) {
      setMarkedToday([]);
    }
  };

  // unmarked users = allUsers - markedToday
  const unmarkedUsers = useMemo(() => {
    const markedIds = new Set(markedToday.map(m => String(m.memberId) || m.uniqueIdCard));
    return allUsers
      .filter(u => !markedIds.has(String(u._id)) && u.role === 'member')
      .filter(
        u =>
          u.name.toLowerCase().includes(unmarkedQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(unmarkedQuery.toLowerCase())
      );
  }, [allUsers, markedToday, unmarkedQuery]);

  // filtered marked
  const filteredMarked = useMemo(() => {
    return markedToday.filter(
      m =>
        m.memberName.toLowerCase().includes(markedQuery.toLowerCase()) ||
        (m.membershipType || '').toLowerCase().includes(markedQuery.toLowerCase())
    );
  }, [markedToday, markedQuery]);

  // paginated marked
  const paginatedMarked = useMemo(() => {
    const start = (markedPage - 1) * limit;
    return filteredMarked.slice(start, start + limit);
  }, [filteredMarked, markedPage]);

  // paginated unmarked
  const paginatedUnmarked = useMemo(() => {
    const start = (unmarkedPage - 1) * limit;
    return unmarkedUsers.slice(start, start + limit);
  }, [unmarkedUsers, unmarkedPage]);

  const handleMarkPresent = user => {
    // const slotStr = prompt('Enter slot number (1-9) for ' + user.name, '1');
    
     if (!islot || islot < 1 || islot > 9 || isNaN(Number(islot))){
      setslotError("invalid slot")
      return;
    }
    const slotStr = islot;

    
    const slot = Number(slotStr);
  //  if (!slot || slot < 1 || slot > 9){
  //     setslotError("invalid slot")
  //     return;
  //   }
    
    // return alert('Invalid slot');

    const newMember = {
      memberId: user._id,
      memberName: user.name,
      // edited for email change
      memberEmail: user.email || '',
      membershipType: user.membership?.type || '',
      uniqueIdCard: user.uniqueIdCard || '',
      slot,
    };
    setIslot("")
    setSelectedUser();
    setModal("");
    setMarkedToday(prev => [...prev, newMember]);
  };

  // const handleRemove = async member => {
  //   if (!window.confirm(`Remove ${member.memberName} from today's attendance?`)) return;
  //   try {
  //     loadToday();
  //     await api.deleteMemberFromToday({ date: today, memberId: member.memberId });
  //   } catch (err) {
  //     console.error(err);
  //     alert(err?.data?.message || 'Failed to remove');
  //   }
  // };

  const removePrior = (m) =>{
    const unsavedMembers = markedToday.filter(m => !m._id);
  if (unsavedMembers.length > 0) {
    setModalMessage('Save unmarked users first');
    setModal("alert")
    return;
  }
  else{

    setModal("confirm")
    setSelectedDeleteUSer(m)
  }

  }


  const handleRemove = async member => {
  // Check for unsaved members before allowing delete
  

  // if (!window.confirm(`Remove ${member.memberName} from today's attendance?`)) return;
  try {
    await api.deleteMemberFromToday({ date: today, memberId: member.memberId });
    loadToday();
    setModal("")
  } catch (err) {
    console.error(err);
    setModalMessage(err?.data?.message || 'Failed to remove');
    setModal("alert")
  }
};


  // const handleUpdateSlot = async member => {
  //   const newSlotStr = prompt(`Enter new slot (1-9) for ${member.memberName}`, member.slot);
  //   const newSlot = Number(newSlotStr);
  //   if (!newSlot || newSlot < 1 || newSlot > 9) return alert('Invalid slot');
  //   try {
  //     await api.updateMemberSlot({ date: today, memberId: member.memberId, newSlot });
  //     loadToday();
  //   } catch (err) {
  //     console.error(err);
  //     alert(err?.data?.message || 'Failed to update slot');
  //   }
  // };
  const handleUpdateSlot = async member => {
  
     if (!islot || islot < 1 || islot > 9 || isNaN(Number(islot))){
      setslotError("invalid slot")
      return;
    }    
    
    const newSlot = Number(islot);
    try {
      await api.updateMemberSlot({ date: today, memberId: member.memberId, newSlot });
      loadToday();

       setIslot("")
    setSelectedEditUSer();
    setModal("");
    } catch (err) {
      console.error(err);
      setslotError(err?.data?.message || 'Failed to update slot');

      
    }
  };

  const handleSave = async () => {
    const newMembers = markedToday.filter(m => !allUsers.some(u => u._id === m.memberId && m._id));
    if (newMembers.length === 0) {
      setModalMessage('No new members to save');
      setModal("alert");
return;
    } 

    const members = newMembers.map(m => ({
      memberId: m.memberId,
      memberEmail: m.memberEmail,
      memberName: m.memberName,
      membershipType: m.membershipType,
      uniqueIdCard: m.uniqueIdCard,
      slot: m.slot,
    }));

    const body = { date: today, members };

    setSaving(true);
    try {
      await api.markAttendance(body);
      setModalMessage('Saved successfully');

      loadToday();
      loadUsers();
      setModal("alert");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };
  // console.log(modal);
  
  // total pages
  const markedTotalPages = Math.ceil(filteredMarked.length / limit) || 1;
  const unmarkedTotalPages = Math.ceil(unmarkedUsers.length / limit) || 1;

  return (
    <div className={styles.wrap}>
      <h1>Mark Today's Attendance</h1>
      <div className={styles.cols}>
        {/* ---- MARKED MEMBERS ---- */}
        <section className={styles.left}>
          <h3 style={{ marginBottom: '10px' }}>
            Marked Members ({markedToday.length})
          </h3>

          {/* search bar for marked */}
          <input
            id={styles.searchMem}
            style={{marginBottom:"10px"}}
            placeholder="Search marked members"
            value={markedQuery}
            onChange={e => {
              setMarkedQuery(e.target.value);
              setMarkedPage(1); // reset to first page
            }}
          />

          <div className={styles.cards}>
            {paginatedMarked.map((m, idx) => (
              <div key={idx} className={styles.card}>
                <div>
                  <strong>{m.memberName}</strong>
                  <div className={styles.muted}>{m.membershipType}</div>
                  <div className={styles.slot}>Slot: {m.slot}</div>
                </div>
                <div className={styles.actions}>
                  <button className={styles.editBTN} 
                  // onClick={() => handleUpdateSlot(m)}
                  onClick={() =>{ setModal("edit")
                    setSelectedEditUSer(m)
                  }}
                  
                  >
                    {/* Edit Slot  */}
                  <span id={styles.editIcon}><CiEdit /></span>
                    </button>
                  <button className={styles.remove} onClick={() => {
                    
                    removePrior(m)}}>
                    {/* Remove  */}
                    <span id={styles.removeIcon}><MdDelete /></span>
                    </button>
                </div>
              </div>
            ))}
            {filteredMarked.length === 0 && (
              <div className={styles.empty}>No marked members match your search.</div>
            )}
          </div>

          {/* pagination for marked */}
          <div className={styles.pagination}>
            <button
              disabled={markedPage <= 1}
              onClick={() => setMarkedPage(p => p - 1)}
            >
              Prev
            </button>
            <span>
              Page {markedPage} of {markedTotalPages}
            </span>
            <button
              disabled={markedPage >= markedTotalPages}
              onClick={() => setMarkedPage(p => p + 1)}
            >
              Next
            </button>
          </div>

          <div className={styles.saveRow}>
            <button onClick={handleSave} disabled={saving} id={styles.saveBtn}>
              {saving ? 'Saving...' : 'Save New Marks'}
            </button>
          </div>
        </section>

        {/* ---- UNMARKED MEMBERS ---- */}
        <aside className={styles.right}>
          <h3 id={styles.smHead}>Search Members</h3>
          <input
            id={styles.searchMem}
            placeholder="Search unmarked members"
            value={unmarkedQuery}
            onChange={e => {
              setUnmarkedQuery(e.target.value);
              setUnmarkedPage(1); // reset to first page
            }}
          />
          <div className={styles.resultList}>
            {loading && <div style={{minHeight: "300px", display: "flex", justifyContent: "center", alignItems: "center"}}>Loading users...</div>}
            {!loading && paginatedUnmarked.length === 0 && (
              <div className={styles.empty}>No users found</div>
            )}
            {paginatedUnmarked.map(u => (
              <div className={styles.resultCard} key={u._id}>
                <div>
                  <strong>{u.name}</strong>
                  <div className={styles.muted}>{u.email}</div>
                  <div className={styles.muted}>
                    Membership: {u.membership?.type || '—'}
                  </div>
                </div>
                <div>
                  <button id={styles.markBTN} 
                  onClick={()=>{setModal('slot')
                    setSelectedUser(u);
                  }
                  }
                  // onClick={() => handleMarkPresent(u)}
                  
                  >Mark</button>
                </div>
              </div>
            ))}
          </div>

          {/* pagination for unmarked */}
          <div className={styles.pagination}>
            <button
              disabled={unmarkedPage <= 1}
              onClick={() => setUnmarkedPage(p => p - 1)}
            >
              Prev
            </button>
            <span>
              Page {unmarkedPage} of {unmarkedTotalPages}
            </span>
            <button
              disabled={unmarkedPage >= unmarkedTotalPages}
              onClick={() => setUnmarkedPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </aside>
      </div>
      { modal &&(
      <div className={styles2.modal}>


        { (modal==="slot"||modal==="edit") && (
        <div className={styles2.modalContent}>
          <div className={styles2.ids} >
            {slotError && <p style={{color:"red"}}>Invalid Slot</p>}
          {  modal==="slot" &&  <h3>Enter Slot 1 to 9</h3>}
          {  modal==="edit" &&  <h3>Edit Slot </h3>}
            <input className={styles2.si} type="text" 
            value={islot}
            placeholder="Slot"

            onChange={(e)=>setIslot(e.target.value)}
            
            />   
            <div className={styles2.bind}>
          {  modal==="slot" &&  <button
              style={{backgroundColor:"#258a25ff"}}

              className={styles2.mkb}
              onClick={()=>{handleMarkPresent(selectedUSer)

              // setslotError("");

              }}
              >mark</button>}
          {  modal==="edit" &&  <button
              style={{backgroundColor:"#258a25ff"}}

              className={styles2.mkb}
              onClick={()=>{handleUpdateSlot(selectedEditUSer)

              // setslotError("");

              }}
              >save</button>}

              {modal==="slot" && <button 
              className={styles2.mkb}
              style={{backgroundColor:"#626462"}}

              onClick={()=>{setModal("")
                setIslot("");
                setSelectedUser(null)
                setslotError("");
              }
              }
              >cancel</button>}

              {modal==="edit" && <button 
              className={styles2.mkb}
              style={{backgroundColor:"#626462"}}

              onClick={()=>{setModal("")
                setIslot("");
                setSelectedEditUSer(null)
                setslotError("");
              }
              }
              >cancel</button>}
            </div>
          </div>
           
        </div>)




              





      }
         {modal === "alert" && (
            <div className={styles2.modalContent}>
              <h3  style={{marginBottom:"10px"}}>{modalMessage}</h3>
              <button
                className={styles2.mkb}
                onClick={() => {setModal("")
                  setModalMessage("");
                }
                }
                style={{ backgroundColor: "#258a25ff" }}
              >
                OK
              </button>
            </div>
          )}

          {/* CONFIRM MODAL */}
          {modal === "confirm" && (
            <div className={styles2.modalContent}>
              <h3 style={{marginBottom:"10px"}}>Remove {selectedDeleteUSer.memberName} from today's attendance?</h3>
              <div className={styles2.bind}>
                <button
                  className={styles2.mkb}
                  style={{ backgroundColor: "#d9534f" }}
                  onClick={() => {
                    handleRemove(selectedDeleteUSer);
                  }}
                >
                  Delete
                </button>
                <button
                  className={styles2.mkb}
                  style={{ backgroundColor: "#666" }}
                  onClick={() => setModal("")}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}




        </div>
      )

      

        }
    </div>
  );
};

export default MarkAttendance;

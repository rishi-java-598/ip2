
// import React, { useEffect, useState } from 'react';
// import styles from './MemberPI.module.css';

// const MemberPI = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem('token'); // assuming JWT is stored here

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/api/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`Error: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log(data);
        
//         setProfile(data.user);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   if (loading) return <p className={styles.status}>Loading...</p>;
//   if (error) return <p className={styles.error}>Error: {error}</p>;

//   return (
//     <div className={styles.profileContainer}>
//       <h2 className={styles.heading}>User Profile</h2>
      
//       <div className={styles.profileItem}><strong>ID:</strong> {profile.id}</div>
//       <div className={styles.profileItem}><strong>Name:</strong> {profile.name}</div>
//       <div className={styles.profileItem}><strong>Email:</strong> {profile.email}</div>
//       <div className={styles.profileItem}><strong>Phone:</strong> {profile.phone}</div>
//       <div className={styles.profileItem}><strong>Role:</strong> {profile.role}</div>
//       <div className={styles.profileItem}><strong>Gender:</strong> {profile.gender}</div>
//       {profile.membership ? (
//         <>
//           <div className={styles.profileItem}>
//             <strong>Membership Type:</strong> {profile.membership.type}
//           </div>
//           <div className={styles.profileItem}>
//             <strong>Status:</strong> {profile.membership.status}
//           </div>
//           {profile.membership.validity && (
//             <>
//               <div className={styles.profileItem}>
//                 <strong>Validity Start:</strong>{' '}
//                 {new Date(profile.membership.validity.startDate).toLocaleDateString()}
//               </div>
//               <div className={styles.profileItem}>
//                 <strong>Validity End:</strong>{' '}
//                 {new Date(profile.membership.validity.endDate).toLocaleDateString()}
//               </div>
//             </>
//           )}
//         </>
//       ) : (
//         <div className={styles.profileItem}>
//           <strong>Membership:</strong> Not available
//         </div>
//       )}

//       <div className={styles.profileItem}>
//         <strong>Unique ID Card:</strong> {profile.uniqueIdCard}
//       </div>
//       <div className={styles.profileItem}>
//         <strong>Status:</strong> {profile.status}
//       </div>
//       <div className={styles.profileItem}>
//         <strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}
//       </div>
//     </div>
//   );
// };

// export default MemberPI;



// time fixed

// import React, { useEffect, useState } from 'react';
// import styles from './MemberPI.module.css';

// const formatDateUTC = (dateString) => {
//   const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
//   if (!match) return dateString;
//   const year = match[1];
//   const month = parseInt(match[2], 10);
//   const day = parseInt(match[3], 10);
//   return `${month}/${day}/${year}`;
// };

// const MemberPI = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/api/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`Error: ${res.status}`);
//         }

//         const data = await res.json();
//         setProfile(data.user);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   if (loading) return <p className={styles.status}>Loading...</p>;
//   if (error) return <p className={styles.error}>Error: {error}</p>;

//   return (
//     <div className={styles.profileContainer}>
//       <h2 className={styles.heading}>User Profile</h2>

//       <div className={styles.profileItem}><strong>ID:</strong> {profile.id}</div>
//       <div className={styles.profileItem}><strong>Name:</strong> {profile.name}</div>
//       <div className={styles.profileItem}><strong>Email:</strong> {profile.email}</div>
//       <div className={styles.profileItem}><strong>Phone:</strong> {profile.phone}</div>
//       <div className={styles.profileItem}><strong>Role:</strong> {profile.role}</div>
//       <div className={styles.profileItem}><strong>Gender:</strong> {profile.gender}</div>
//       {profile.membership ? (
//         <>
//           <div className={styles.profileItem}>
//             <strong>Membership Type:</strong> {profile.membership.type}
//           </div>
//           <div className={styles.profileItem}>
//             <strong>Status:</strong> {profile.membership.status}
//           </div>
//           {profile.membership.validity && (
//             <>
//               <div className={styles.profileItem}>
//                 <strong>Validity Start:</strong>{' '}
//                 {formatDateUTC(profile.membership.validity.startDate)}
//               </div>
//               <div className={styles.profileItem}>
//                 <strong>Validity End:</strong>{' '}
//                 {formatDateUTC(profile.membership.validity.endDate)}
//               </div>
//             </>
//           )}
//         </>
//       ) : (
//         <div className={styles.profileItem}>
//           <strong>Membership:</strong> Not available
//         </div>
//       )}

//       <div className={styles.profileItem}>
//         <strong>Unique ID Card:</strong> {profile.uniqueIdCard}
//       </div>
//       <div className={styles.profileItem}>
//         <strong>Status:</strong> {profile.status}
//       </div>
//       <div className={styles.profileItem}>
//         <strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}
//       </div>
//     </div>
//   );
// };

// export default MemberPI;








// import { useEffect, useState } from 'react';
// import styles from './MemberPI.module.css';
// import MemberAI from './MemberAI';
// import { data } from 'react-router-dom';

// const formatDateUTC = (dateString) => {
//   const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
//   if (!match) return dateString;
//   const year = match[1];
//   const month = parseInt(match[2], 10);
//   const day = parseInt(match[3], 10);
//   return `${month}/${day}/${year}`;
// };

// const MemberPI = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [adata,setaData]=useState(null);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch('http://localhost:3000/api/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error(`Error: ${res.status}`);
//         }

//         const data = await res.json();
//         setProfile(data.user);
//         const res2 = await fetch('http://localhost:3000/api/attendance/memberp/', 
//             {
//                  headers: {
//             Authorization: `Bearer ${token}`,
//           },
//             }
//         )
//         if (!res.ok) {
//           throw new Error(`Error: ${res.status}`);
//         }
//         const data2 = await res2.json();
//         console.log(data2);
        
//         setaData(data2);

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   if (loading) return <p className={styles.status}>Loading...</p>;
//   if (error) return <p className={styles.error}>Error: {error}</p>;
//     //   ${styles[profile?.membership?.type?.toLowerCase()]}

//   return (
//     <>
//     <div className={styles.mc}>
//     <div className={styles.outerContainer}>
//       <h1 className={styles.outerHeading}>Profile Card</h1>
//       <div className={`${styles.profileContainer} 
//       `}>
//         <h2 className={`${styles.heading}   `}
//     >{profile.membership.type} card</h2>
//     <hr style={{
//           height: "10px",
//           marginTop:"4px",
//           backgroundColor: "#ea9df7",
//           borderRadius: "10px",
//     //       boxShadow: "0 0 15px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4)",
//     // transition: "box-shadow 0.3s ease",
//     }}/>
//     {/* <hr style={{
//           height: "2px",
//           marginTop:"4px",
//           backgroundColor: "#ea9df7",
//           borderRadius: "10px", */}
//     {/* //       boxShadow: "0 0 15px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4)",
//     // transition: "box-shadow 0.3s ease", */}
//     {/* }}/> */}

//         {/* <div className={styles.profileItem}><strong>ID:</strong> {profile.id}</div> */}
        
//         <div className={styles.couter}>
//         <div className={styles.cleft}>
       
//         <div className={styles.profileItem}><strong>Name:</strong> {profile.name}</div>
//         <div className={styles.profileItem}><strong>Email:</strong> {profile.email}</div>
//         <div className={styles.profileItem}><strong>Phone:</strong> {profile.phone}</div>
        
//         </div>
//         {/* <div className={styles.profileItem}><strong>Role:</strong> {profile.role}</div> */}

//        <div className={styles.cright}>
//         <div className={styles.profileItem}>
//           <strong>Gender:</strong>{' '}
//           <span
//             className={`${styles.genderBadge} ${
//               profile.gender === 'Male' ? styles.male : styles.female
//             }`}
//           >
//             {profile.gender}
//           </span>
//         </div>
//              {profile.membership ? (
//             <div className={`${styles.profileItem} `}>
//               <strong>Membership Type: </strong> 
//               {profile.membership.type}
//             </div>
//             ) : <div className={styles.profileItem}>
//               <strong>Membership Type:</strong> N/A
//             </div>}

//             <div className={styles.profileItem}>
//           <strong>Unique ID:</strong> {profile.uniqueIdCard}
//         </div>
//         </div>

//         </div>



//             <div className={styles.ldc}>
//         {profile.membership ? (
//           <>
//             {/* <div className={styles.profileItem}>
//               <strong>Membership Type:</strong> {profile.membership.type}
//             </div> */}
           
//             {profile.membership.validity && (
//               <>
//                 <div className={styles.profileItem}>
//                   <strong>Valid from:</strong>{' '}
//                   {formatDateUTC(profile.membership.validity.startDate)}
//                 </div>
//                 <div className={styles.profileItem}>
//                   <strong>to:</strong>{' '}
//                   {formatDateUTC(profile.membership.validity.endDate)}
//                 </div>
//               </>
//             )}
//           </>
//         ) : (
//           <div className={styles.profileItem}>
//             <strong>Membership:</strong> Not available
//           </div>
//         )}
        
//         <div className={styles.profileItem}>
//           {/* <strong>Status:</strong> {profile.status} */}
//         </div>
       
//         </div>
//  <div className={styles.profileItem}>
//           <strong>Member since:</strong> {new Date(profile.createdAt).toLocaleDateString()}
//         </div>
//       </div>

// </div>


//     </div>


//  <MemberAI userId={profile.id}/>


       

// </>
//   );
// };

// export default MemberPI;




















import { useEffect, useState } from 'react';
import styles from './MemberPI.module.css';
import MemberAI from './MemberAI';

const formatDateUTC = (dateString) => {
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return dateString;
  const year = match[1];
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  return `${month}/${day}/${year}`;
};

const MemberPI = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [adata, setaData] = useState(null);
  const [thisMonthCount, setThisMonthCount] = useState(0);
  const [thisWeekCount, setThisWeekCount] = useState(0);
  const [monthlyCount, setMonthlyCount] = useState({});
  const [weeklyCount, setWeeklyCount] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Error: ${res.status}`);

        const data = await res.json();
        setProfile(data.user);

        const res2 = await fetch('http://localhost:3000/api/attendance/memberp/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res2.ok) throw new Error(`Error: ${res2.status}`);
        const data2 = await res2.json();

         const monthly = data2.stats?.monthlyCount || {};
      const weekly = data2.stats?.weeklyCount || {};

      setMonthlyCount(monthly);
      setWeeklyCount(weekly);

      // ✅ Compute latest month/week values safely
      const latestMonthKey = Object.keys(monthly).sort().pop();
      const latestMonthValue = latestMonthKey ? monthly[latestMonthKey] : 0;

      const latestWeekKey = Object.keys(weekly)
        .sort((a, b) => {
          const [yearA, weekA] = a.split("-W").map(Number);
          const [yearB, weekB] = b.split("-W").map(Number);
          return yearA !== yearB ? yearA - yearB : weekA - weekB;
        })
        .pop();
      const latestWeekValue = latestWeekKey ? weekly[latestWeekKey] : 0;

      setThisMonthCount(latestMonthValue);
      setThisWeekCount(latestWeekValue);
        // setaData(data2);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  // Demo attendance summary data
  // const thisMonthCount = 5;
  // const thisWeekCount = 2;

  // const monthlyCount = { "2025-10": 2, "2025-09": 5 };
  // const weeklyCount = { "2025-W43": 1, "2025-W40": 1, "2025-W39": 2, "2025-W38": 3 };

  return (
    <>
      <div className={styles.mc}>
        <div className={styles.outerContainer}>
          <h1 
            style={{
              marginTop:"20px"
            }}
          className={styles.outerHeading}>Profile Card</h1>

          <div className={styles.profileContainer}>
            <h2 
          
            className={styles.heading}>{profile.membership.type} card</h2>
            <hr
              style={{
                height: "10px",
                marginTop: "4px",
                // backgroundColor: "#d8aa00ff",
                // backgroundColor: "#ea9df7",
                backgroundColor: (profile.membership.type==="silver")?"#ddddddff":profile.membership.type==="platinum"?"#ea9df7": "#d8aa00ff",
                borderRadius: "10px",
              }}
            />

            <div className={styles.couter}>
              <div className={styles.cleft}>
                <div className={styles.profileItem}><strong>Name:</strong> {profile.name}</div>
                <div className={styles.profileItem}><strong>Email:</strong> {profile.email}</div>
                <div className={styles.profileItem}><strong>Phone:</strong> {profile.phone}</div>
              </div>

              <div className={styles.cright}>
                <div className={styles.profileItem}>
                  <strong>Gender:</strong>{' '}
                  <span
                    className={`${styles.genderBadge} ${
                      profile.gender === 'Male' ? styles.male : styles.female
                    }`}
                  >
                    {profile.gender}
                  </span>
                </div>
                {profile.membership ? (
                  <div className={styles.profileItem}>
                    <strong>Membership Type: </strong> {profile.membership.type}
                  </div>
                ) : (
                  <div className={styles.profileItem}>
                    <strong>Membership Type:</strong> N/A
                  </div>
                )}

                <div className={styles.profileItem}>
                  <strong>Unique ID:</strong> {profile.uniqueIdCard}
                </div>
              </div>
            </div>

            <div className={styles.ldc}>
              {profile.membership?.validity && (
                <>
                  <div className={styles.profileItem}>
                    <strong>Valid from:</strong>{' '}
                    {formatDateUTC(profile.membership.validity.startDate)}
                  </div>
                  <div className={styles.profileItem}>
                    <strong>to:</strong>{' '}
                    {formatDateUTC(profile.membership.validity.endDate)}
                  </div>
                </>
              )}
            </div>

            <div className={styles.profileItem}>
              <strong>Member since:</strong>{' '}
              {new Date(profile.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* 🔹 Right Summary Boxes */}
        <div className={styles.summaryContainer}>
          <div className={styles.summaryBox}>
            <h3>This Month</h3>
            <p>{thisMonthCount} Days Present</p>
          </div>
          <div className={styles.summaryBox}>
            <h3>This Week</h3>
            <p>{thisWeekCount} Days Present</p>
          </div>
        </div>
      </div>

      {/* 🔹 Attendance Data Section */}
    

      <MemberAI userId={profile.id} />
    </>
  );
};

export default MemberPI;

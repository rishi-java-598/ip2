import { useEffect, useState } from "react";
import styles from "./MemberAI.module.css";
import { api } from "../admin/admin_M_AM/api";

const MemberAI = ({ userId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uname, setUname] = useState("");
    const [monthlyCount, setMonthlyCount] = useState({});
    const [weeklyCount, setWeeklyCount] = useState({});

  // Query states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
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
      setMonthlyCount(res.stats.monthlyCount || {});
      setWeeklyCount(res.stats.weeklyCount || {});

      setUname(res.username || "");
      setRecords(res.records || []);
      setTotalPages(res.totalPages || 1);
      setTotalRecords(res.totalRecords || 0);
    } catch (err) {
      console.error("Error fetching member attendance:", err);
      setUname(err.data?.username || "___");
    }
    setLoading(false);
  };

  return (

<>
  <div className={styles.dataSection}>
        <h2>Attendance Overview</h2>

        <div className={styles.dataGrid}>
          <div className={styles.dataBlock}>
            <h4>Monthly Count</h4>
            <ul>
              {Object.entries(monthlyCount).map(([month, count]) => (
                <li key={month}>
                  <strong>{month}:</strong> {count}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.dataBlock}>
            <h4>Weekly Count</h4>
            <ul>
              {Object.entries(weeklyCount).map(([week, count]) => (
                <li key={week}>
                  <strong>{week}:</strong> {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>



    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Member Attendance for {uname}</h2>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>Slot:</label>
          <select value={slot} onChange={e => setSlot(e.target.value)}>
            <option value="">All</option>
            {Array.from({ length: 9 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Slot {i + 1}
              </option>
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
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Records */}
      <div className={styles.records}>
        {loading && <div className={styles.loading}>Loading...</div>}
        {!loading && records.length === 0 && (
          <div className={styles.noRecords}>No records found</div>
        )}
        {!loading &&
          records.map((r, idx) => (
            <div key={idx} className={styles.recordCard}>
              <div>
                <strong>{new Date(r.date).toLocaleDateString()}</strong>
              </div>
              <div>{r.slot}</div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages} (Total {totalRecords})
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </div>
    </>

  );
};

export default MemberAI;

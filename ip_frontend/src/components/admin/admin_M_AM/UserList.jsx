// code splitting added :
import { useEffect, useState, lazy, Suspense } from "react";
import styles from "./style.module.css";
import { api } from "./api";
import { FaArrowRight } from "react-icons/fa6";

// 🧩 Lazy-load modal only when needed
const UserAttendanceDetail = lazy(() => import("./UAdetails"));

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    load(page);
  }, [page]);

  const load = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await api.getUsers(`?role=member&page=${pageNum}&limit=${limit}&status=registered`);
      const data = res.data || res;
      setUsers(data.users || []);
      // console.log(data.users);
      
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );
// console.log(selectedUser);

  return (
    <div className={styles.wrap}>
      <h1 style={{ marginBottom: "10px" }}>All Members</h1>

      <div className={styles.controls}>
        <input
          id={styles.searMem}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {loading && (
          <div
            style={{
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        )}

        {!loading &&
          filtered.map((u) => (
            <div key={u._id} className={styles.userCard}>
              <div>
                <strong>{u.name}</strong>
                <div className={styles.muted}>{u.email}</div>
                <div className={styles.muted}>
                  Membership: {u.membership?.type || u.membershipType || "—"}
                </div>
              </div>
              <div>
                <button
                  className={styles.viewUABTN}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedUser(u._id);
                  }}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}

        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>No members</div>
        )}
      </div>

      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* 🧩 Lazy-loaded detail modal */}
      {selectedUser && (
        <Suspense
          fallback={
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                background: "rgba(0,0,0,0.05)",
                borderRadius: "8px",
              }}
            >
              Loading user details...
            </div>
          }
        >
          <UserAttendanceDetail
            userId={selectedUser}
            onClose={() => setSelectedUser(null)}
            // uname={{selectedUser.name}}
          />
        </Suspense>
      )}
    </div>
  );
};

export default UserList;

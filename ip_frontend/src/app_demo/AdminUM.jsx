import  { useState, useEffect } from "react";
import axios from "axios";
import PendingUserApproval from "./pendingReqs"
import styles from "../../../styles/manager/mum.module.css";
import DeleteUserRequests from "./DelReq";

const API_HOST = "http://localhost:3000/api";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  //added
  //   const [newUser, setNewUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  //   uniqueIdCard: "",
  //   Gender: "Male",
  //   role: "member",
  //   membership: "",
  // });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    uniqueIdCard: "",
    Gender: "Male",
    role: "member",
    membership: {
      type: "",
      status: "inactive",
      validity: {
        startDate: "",
        endDate: "",
      },
    },
  });
  /////////

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState(null); // view/edit/delete

  // 🔄 Fetch users (only members with status=registered)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_HOST}/users`, {
        params: { 
          search, 
          sortBy, 
          order, 
          page, 
          limit,
          role: "member",
          status: "registered"
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch users. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, sortBy, order, page, limit]);

  // 📝 Update user
  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.put(
        `${API_HOST}/auth/update-user/${selectedUser._id}`,
        selectedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setModalMode(null);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Request delete
  // const handleDeleteRequest = async () => {
  //   try {
  //     setLoading(true);
  //     setError("");

  //     await axios.post(
  //       `${API_HOST}/manager/delete-member-request`,
  //       { userId: selectedUser._id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     setModalMode(null);
  //     setSelectedUser(null);
  //     fetchUsers();
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.response?.data?.message || "Failed to request deletion.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const handleDeleteUser = async () => {
  try {
    setLoading(true);
    setError("");

    await axios.delete(`${API_HOST}/delete/user/${selectedUser._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setModalMode(null);
    setSelectedUser(null);
    fetchUsers(); // Refresh the list
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Failed to delete user.");
  } finally {
    setLoading(false);
  }
};



// added
//  const handleAddUser = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(`${API_HOST}/auth/add-user`, newUser, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setModalMode(null);
//       setNewUser({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         uniqueIdCard: "",
//         Gender: "Male",
//         role: "member",
//         membership: "",
//       });
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to add user.");
//     } finally {
//       setLoading(false);
//     }
//   };

  const handleAddUser = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(`${API_HOST}/auth/add-user`, newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setModalMode(null);
      setNewUser({
        name: "",
        email: "",
        password: "",
        phone: "",
        uniqueIdCard: "",
        Gender: "Male",
        role: "member",
        membership: {
          type: "",
          status: "inactive",
          validity: {
            startDate: "",
            endDate: "",
          },
        },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add user.");
    } finally {
      setLoading(false);
    }
  };
  ////////
  console.log(modalMode);
  
  return (
    <div className={styles.aumcontainer}>
      <h2 className={styles.mumheader}>User Management</h2>

      {/* Search + Sort */}
      <input
          type="text"
          id={styles.searchBar2}
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      <div className={styles.controls}>
        <input
          type="text"
          id={styles.searchBar}
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
 <button
           style={{cursor:"pointer"}}

          className={styles.addBtn}
          onClick={() => setModalMode("add")}
        >
           Add User
        </button>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      {/* Loader & Error */}
      {loading && <p 
      // style={{ textAlign: "center" }}
      className={styles.empty}>
        Loading...</p>}
      {error && <p id={styles.errormsg} style={{ color: "red", textAlign: "center",padding:"4px" }}>{error}</p>}

      {/* User Cards */}
      <div className={styles.userGrid}>
        {!loading && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className={styles.userCard}
              onClick={() => {
                setSelectedUser({ ...user });
                setModalMode("view");
              }}
            >
              <div className={styles.cardHeader}>
                <h3>{user.name}</h3>
                <span style={{backgroundColor:user.membership?.status==="active"?"#50f39f35":"#cd212139"}} className={styles.role}>
                  {user.membership?.status || "inactive"}
                </span>
              </div>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <p className={styles.membership}>
                {user.membership?.type || "No Membership"} •{" "}
                {user.membership?.status}
              </p>
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser({ ...user });
                    setModalMode("edit");
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser(user);
                    setModalMode("delete");
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className={styles.empty}>No users found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>




   {modalMode === "add" && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add User</h3>

            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Unique ID"
              value={newUser.uniqueIdCard}
              onChange={(e) =>
                setNewUser({ ...newUser, uniqueIdCard: e.target.value })
              }
            />

            {/* Gender */}
            <select
              value={newUser.Gender}
              onChange={(e) =>
                setNewUser({ ...newUser, Gender: e.target.value })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* Role */}
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="member">Member</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            {/* Membership (only for members) */}
            {newUser.role === "member" && (
              <>
                <select
                  value={newUser.membership.type}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      membership: {
                        ...newUser.membership,
                        type: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">Select Membership</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Platinum">Platinum</option>
                </select>

                <select
                  value={newUser.membership.status}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      membership: {
                        ...newUser.membership,
                        status: e.target.value,
                      },
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <label>Validity Start</label>
                <input
                  type="date"
                  value={newUser.membership.validity.startDate}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      membership: {
                        ...newUser.membership,
                        validity: {
                          ...newUser.membership.validity,
                          startDate: e.target.value,
                        },
                      },
                    })
                  }
                />

                <label>Validity End</label>
                <input
                  type="date"
                  value={newUser.membership.validity.endDate}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      membership: {
                        ...newUser.membership,
                        validity: {
                          ...newUser.membership.validity,
                          endDate: e.target.value,
                        },
                      },
                    })
                  }
                />
              </>
            )}

            <div className={styles.modalControls}>
              <button
                className={styles.addBtn}
                onClick={handleAddUser}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setModalMode(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}




      {selectedUser && (
        <div className={styles.modal}>
   
            {/* <div
    className={`${styles.modalContent} ${
      styles[selectedUser.membership?.type?.toLowerCase()]}
        ${styles["ucard"]}
      }`}
    > */}

      <div
  className={`${styles.modalContent} ${
    modalMode === "view"
      ? styles[selectedUser.membership?.type?.toLowerCase()]
      : ""
  } ${styles["ucard"]}`}
>

    {modalMode === "view" && (
      <>
        <h3>User Details</h3>
        <p><b>Name:</b> {selectedUser.name}</p>
        <p><b>Email:</b> {selectedUser.email}</p>
        <p>
          <b>Gender:</b>{" "}
          <span
            className={`${styles.genderBadge} ${
              selectedUser.Gender === "Male" ? styles.male : styles.female
            }`}
          >
            {selectedUser.Gender}
          </span>
        </p>
        <p><b>Phone:</b> {selectedUser.phone}</p>
        <p><b>Status:</b> {selectedUser.status}</p>
        <p><b>Unique ID:</b> {selectedUser.uniqueIdCard}</p>
        <p>
          <b>Membership:</b> {selectedUser.membership?.type || "-"} (
          {selectedUser.membership?.status})
        </p>
        <p>
          <b>Validity:</b>{" "}
          {selectedUser.membership?.validity?.startDate || "-"} to{" "}
          {selectedUser.membership?.validity?.endDate || "-"}
        </p>
        <button
        style={{margin:"0px"}}
          className={styles.cancelButton}
          onClick={() => setSelectedUser(null)}
        >
          Close
        </button>
      </>
    )}
  

            {modalMode === "edit" && (
              <>
                <h3>Edit User</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={selectedUser.phone}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Unique ID"
                  value={selectedUser.uniqueIdCard || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      uniqueIdCard: e.target.value,
                    })
                  }
                />

                {/* removed role dropdown */}

                <select
                  value={selectedUser.status}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, status: e.target.value })
                  }
                >
                  <option value="registered">Registered</option>
                  <option value="pending">Pending</option>
                </select>

                <select
                  value={selectedUser.membership?.status || "inactive"}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      membership: {
                        ...selectedUser.membership,
                        status: e.target.value,
                      },
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  value={selectedUser.membership?.type || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      membership: {
                        ...selectedUser.membership,
                        type: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">Select Membership</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Platinum">Platinum</option>
                </select>

                <label>Validity Start</label>
                <input
                  type="date"
                  value={
                    selectedUser.membership?.validity?.startDate
                      ? new Date(
                          selectedUser.membership.validity.startDate
                        ).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      membership: {
                        ...selectedUser.membership,
                        validity: {
                          ...selectedUser.membership?.validity,
                          startDate: e.target.value,
                        },
                      },
                    })
                  }
                />
                <label>Validity End</label>
                <input
                  type="date"
                  value={
                    selectedUser.membership?.validity?.endDate
                      ? new Date(
                          selectedUser.membership.validity.endDate
                        ).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      membership: {
                        ...selectedUser.membership,
                        validity: {
                          ...selectedUser.membership?.validity,
                          endDate: e.target.value,
                        },
                      },
                    })
                  }
                />

                <div className={styles.modalControls}>
                  <button
                    className={styles.updateBtn}
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                  <button className={styles.cancelButton} onClick={() => setSelectedUser(null)}>Cancel</button>
                </div>
              </>
            )}

            {modalMode === "delete" && (
              <>
                <h3>are you sure you want to delete the account of {selectedUser.name}?</h3>
                <div>
                  <button
                    className={styles.deleteBtn}
                    onClick={handleDeleteUser}
                    disabled={loading}
                  >
                    {loading ? "deleting..." : "Confirm"}
                  </button>
                  <button className={styles.cancelButton} onClick={() => setSelectedUser(null)}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

{/* 
  <PendingUserApproval/>
  <DeleteUserRequests/> */}
    </div>
  );
};

export default AdminUserManagement;

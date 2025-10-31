

// part 2



import { useState, useEffect } from "react";
import axios from "axios";
import PendingUserApproval from "./pendingReqs"
import styles from "../../../styles/manager/mum.module.css";
import DeleteUserRequests from "./DelReq";
import * as Yup from "yup";
import { useFormik } from "formik";

const API_HOST = "http://localhost:3000/api";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  



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


    // validation part
    const userSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
      .required("Phone number is required"),
    membership: Yup.object().shape({
      validity: Yup.object().shape({
        startDate: Yup.date().nullable(),
        endDate: Yup.date()
          .nullable()
          .when("startDate", (startDate, schema) => {
            return startDate
              ? schema.min(startDate, "End date must be after start date")
              : schema;
          }),
      }),
    }),
  });


  
// ADD USER FORM
  const addFormik = useFormik({
    initialValues: {
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
        validity: { startDate: "", endDate: "" },
      },
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setAddError("");
        await axios.post(`${API_HOST}/auth/add-user`, values, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setModalMode(null);
        addFormik.resetForm();
        fetchUsers();
      } catch (err) {
        console.error(err);
        setAddError(err.response?.data?.message || "Failed to add user.");
      } finally {
        setLoading(false);
      }
    },
  });

  // EDIT USER FORM
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: selectedUser || {
      name: "",
      email: "",
      phone: "",
      uniqueIdCard: "",
      membership: {
        type: "",
        status: "inactive",
        validity: { startDate: "", endDate: "" },
      },
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setEditError("");
        await axios.put(`${API_HOST}/auth/update-user/${selectedUser._id}`, values, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setModalMode(null);
        setSelectedUser(null);
        fetchUsers();
      } catch (err) {
        console.error(err);
        setEditError(err.response?.data?.message || "Failed to update user.");
      } finally {
        setLoading(false);
      }
    },
  });







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
      setEditError("");

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
      setEditError(err.response?.data?.message || "Failed to update user.");
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
      setDeleteError("");

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
      setDeleteError(err.response?.data?.message || "Failed to delete user.");
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
      setAddError("");

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
      setAddError(err.response?.data?.message || "Failed to add user.");
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
          style={{ cursor: "pointer" }}

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
      {error && <p id={styles.errormsg} style={{ color: "red", textAlign: "center", padding: "4px" }}>{error}</p>}

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
                <span style={{ backgroundColor: user.membership?.status === "active" ? "#50f39f35" : "#cd212139" }} className={styles.role}>
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
                      {addError && <p style={{ color: "red" }}>{addError}</p>}
            <form onSubmit={addFormik.handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={addFormik.values.name}
                onChange={addFormik.handleChange}
              />
              {addFormik.touched.name && addFormik.errors.name && (
                <small style={{ color: "red" }}>{addFormik.errors.name}</small>
              )}

              <input
                name="email"
                placeholder="Email"
                value={addFormik.values.email}
                onChange={addFormik.handleChange}
              />
              {addFormik.touched.email && addFormik.errors.email && (
                <small style={{ color: "red" }}>{addFormik.errors.email}</small>
              )}

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={addFormik.values.password}
                onChange={addFormik.handleChange}
              />

              <input
                name="phone"
                placeholder="Phone (10 digits)"
                value={addFormik.values.phone}
                onChange={addFormik.handleChange}
              />
              {addFormik.touched.phone && addFormik.errors.phone && (
                <small style={{ color: "red" }}>{addFormik.errors.phone}</small>
              )}

              {/* Membership Dates */}
              <label>Validity Start</label>
              <input
                type="date"
                name="membership.validity.startDate"
                value={addFormik.values.membership.validity.startDate}
                onChange={addFormik.handleChange}
              />

              <label>Validity End</label>
              <input
                type="date"
                name="membership.validity.endDate"
                value={addFormik.values.membership.validity.endDate}
                onChange={addFormik.handleChange}
              />
              {addFormik.errors.membership?.validity?.endDate && (
                <small style={{ color: "red" }}>
                  {addFormik.errors.membership.validity.endDate}
                </small>
              )}

              <div className={styles.modalControls}>
                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalMode(null);
                    setAddError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
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
            className={`${styles.modalContent} ${modalMode === "view"
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
                    className={`${styles.genderBadge} ${selectedUser.Gender === "Male" ? styles.male : styles.female
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
                  style={{ margin: "0px" }}
                  className={styles.cancelButton}
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
              </>
            )}


            {modalMode === "edit" && (
              <>
                     {editError && <p style={{ color: "red" }}>{editError}</p>}
           <form onSubmit={editFormik.handleSubmit}>
             <input
                name="name"
                placeholder="Name"
                value={editFormik.values.name}
                onChange={editFormik.handleChange}
              />
              {editFormik.touched.name && editFormik.errors.name && (
                <small style={{ color: "red" }}>{editFormik.errors.name}</small>
              )}

              <input
                name="email"
                placeholder="Email"
                value={editFormik.values.email}
                onChange={editFormik.handleChange}
              />
              {editFormik.touched.email && editFormik.errors.email && (
                <small style={{ color: "red" }}>{editFormik.errors.email}</small>
              )}

              <input
                name="phone"
                placeholder="Phone"
                value={editFormik.values.phone}
                onChange={editFormik.handleChange}
              />
              {editFormik.touched.phone && editFormik.errors.phone && (
                <small style={{ color: "red" }}>{editFormik.errors.phone}</small>
              )}

              <label>Validity Start</label>
              <input
                type="date"
                name="membership.validity.startDate"
                value={editFormik.values.membership?.validity?.startDate || ""}
                onChange={editFormik.handleChange}
              />
              <label>Validity End</label>
              <input
                type="date"
                name="membership.validity.endDate"
                value={editFormik.values.membership?.validity?.endDate || ""}
                onChange={editFormik.handleChange}
              />
              {editFormik.errors.membership?.validity?.endDate && (
                <small style={{ color: "red" }}>
                  {editFormik.errors.membership.validity.endDate}
                </small>
              )}

              <div className={styles.modalControls}>
                <button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUser(null);
                    setModalMode(null);
                    setEditError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
              </>
            )}

            {modalMode === "delete" && (
              <>
                <h3>are you sure you want to delete the account of {selectedUser.name}?</h3>
                            {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}

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



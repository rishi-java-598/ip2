// components/shared/UserCard.jsx
import React from "react";
import styles from "../../styles/shared/UserCard.module.css";

const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <h4>{user.name}</h4>
      <p>Email: {user.email}</p>
      <p>Membership: {user.membershipType}</p>
    </div>
  );
};

export default UserCard;

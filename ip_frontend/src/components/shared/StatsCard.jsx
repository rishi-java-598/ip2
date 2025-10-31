// components/shared/StatsCard.jsx
import React from "react";
import styles from "../../styles/shared/StatsCard.module.css";

const StatsCard = ({ title, value }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatsCard;

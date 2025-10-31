// components/shared/AttendanceTable.jsx
import React from "react";
import styles from "../../styles/shared/AttendanceTable.module.css";

const AttendanceTable = ({ data }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Slot</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td>{row.memberName}</td>
            <td>{row.slot}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;

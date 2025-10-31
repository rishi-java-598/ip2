// components/shared/ExportButton.jsx
import React from "react";
import styles from "../../styles/shared/ExportButton.module.css";

const ExportButton = ({ onExport }) => {
  return (
    <button className={styles.btn} onClick={onExport}>
      📥 Export Data
    </button>
  );
};

export default ExportButton;

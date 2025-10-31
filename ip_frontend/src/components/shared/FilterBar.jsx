// components/shared/FilterBar.jsx
import React from "react";
import styles from "../../styles/shared/FilterBar.module.css";

const FilterBar = ({ filters, onChange }) => {
  return (
    <div className={styles.filterBar}>
      {filters.map((filter, idx) => (
        <select key={idx} onChange={(e) => onChange(filter.key, e.target.value)}>
          <option value="">All {filter.label}</option>
          {filter.options.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default FilterBar;

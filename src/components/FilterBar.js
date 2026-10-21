import React from 'react';
import { GROUPS } from '../data';

const FilterBar = ({ search, onSearchChange, group, onGroupChange }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <span style={{ marginRight: '15px' }}>
        <label htmlFor="search-input">Tìm kiếm </label>
        <input
          id="search-input"
          type="text"
          value={search}
          onChange={onSearchChange}
        />
      </span>

      <span>
        <label htmlFor="group-select">Nhóm </label>
        <select id="group-select" value={group} onChange={onGroupChange}>
          <option value="Tất cả">Tất cả</option>
          {GROUPS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default FilterBar;

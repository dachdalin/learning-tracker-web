import React from 'react';
import { categories, statuses } from '../data/categories';

const FilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  categoryFilter, 
  onCategoryChange, 
  statusFilter, 
  onStatusChange 
}) => {
  return (
    <div className="filter-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="form-input"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          id="search-input"
        />
      </div>
      
      <select
        className="form-select"
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        id="category-filter"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.icon} {cat.name}
          </option>
        ))}
      </select>
      
      <select
        className="form-select"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        id="status-filter"
      >
        <option value="">All Statuses</option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;

import React, { useState } from 'react';
import './SidebarFilter.css';

const SidebarFilter = ({ onFilterChange }) => {
  const [selectedAmount, setSelectedAmount] = useState('');

  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
    onFilterChange(amount);
  };

  return (
    <div className="sidebar-filter">
      <h4 className="sidebar-filter-title">Filter by Goal Amount</h4>
      <ul className="amount-list">
        <li
          className={`amount-item ${selectedAmount === '' ? 'active' : ''}`}
          onClick={() => handleAmountChange('')}
        >
          All
        </li>
        <li
          className={`amount-item ${selectedAmount === '1000' ? 'active' : ''}`}
          onClick={() => handleAmountChange('1000')}
        >
          Less than $1000
        </li>
        <li
          className={`amount-item ${selectedAmount === '5000' ? 'active' : ''}`}
          onClick={() => handleAmountChange('5000')}
        >
          Less than $5000
        </li>
        <li
          className={`amount-item ${selectedAmount === '10000' ? 'active' : ''}`}
          onClick={() => handleAmountChange('10000')}
        >
          Less than $10000
        </li>
        <li
          className={`amount-item ${selectedAmount === '50000' ? 'active' : ''}`}
          onClick={() => handleAmountChange('50000')}
        >
          Less than $50000
        </li>
      </ul>
    </div>
  );
};

export default SidebarFilter;

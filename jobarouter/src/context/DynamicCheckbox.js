// DynamicCheckbox.js
import React from 'react';

const DynamicCheckbox = ({ label, checked, onChange }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default DynamicCheckbox;

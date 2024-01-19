import React, { useState } from 'react';
import { DataProvider } from '../context/DataContext'
import FilteredDataList from '../context/FilteredDataList';
import DynamicCheckbox from '../context/DynamicCheckbox';

export default function FilterContext() {

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleCheckboxChange = (value, stateSetter) => {
    stateSetter((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((prevValue) => prevValue !== value)
        : [...prevValues, value]
    );
  };

  return (
    <DataProvider>
      <div>
        <h1>Filter Data by Category & Type</h1>
        {/* Render dynamic category checkboxes */}
        {['Category A', 'Category B', 'Category C', 'Category D'].map((category) => (
          <DynamicCheckbox
            key={category}
            label={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCheckboxChange(category, setSelectedCategories)}
          />
        ))}
        {/* Render dynamic type checkboxes */}
        {['AB', 'BC', 'CD'].map((type) => (
          <DynamicCheckbox
            key={type}
            label={`Type ${type}`}
            checked={selectedTypes.includes(type)}
            onChange={() => handleCheckboxChange(type, setSelectedTypes)}
          />
        ))}
        <FilteredDataList
          categoryFilters={selectedCategories}
          typeFilters={selectedTypes}
        />
      </div>
    </DataProvider>
  );
}
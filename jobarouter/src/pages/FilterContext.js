import React, { useState } from 'react';
import { DataProvider } from '../context/DataContext'
import FilteredDataList from '../context/FilteredDataList';

export default function FilterContext() {

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
    prevCategories.includes(category)
      ? prevCategories.filter((c) => c !== category) //if 
      : [...prevCategories, category] //else
  );
};
//previous version
//     setSelectedCategories((prevCategories) => {
//       if (prevCategories.includes(category)) {
//         return prevCategories.filter((c) => c !== category);
//       } else {
//         return [...prevCategories, category];
//       }
//     });
//   };

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) =>
    prevTypes.includes(type) ? prevTypes.filter((t) => t !== type) : [...prevTypes, type] // one-line if/else
  );
};
//previous version
//     setSelectedTypes((prevTypes) => {
//       if (prevTypes.includes(type)) {
//         return prevTypes.filter((t) => t !== type);
//       } else {
//         return [...prevTypes, type];
//       }
//     });
//   };

  return (
    <DataProvider>
      <div>
        <h1>Filter Data by Category & Type</h1>
        <p>Uses IndexedDB (not localForage) for db creation, addition, retrieval in context/DataContext1, FilteredDataList1 components.</p>
        <div>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Category A')}
              onChange={() => handleCategoryChange('Category A')}
            />
            Category A
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes('Category B')}
              onChange={() => handleCategoryChange('Category B')}
            />
            Category B
          </label>
        </div>
        {/* Add more category checkboxes as needed */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes('AB')}
              onChange={() => handleTypeChange('AB')}
            />
            Type AB
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={selectedTypes.includes('BC')}
              onChange={() => handleTypeChange('BC')}
            />
            Type BC
          </label>
        </div>
        {/* Add more type checkboxes as needed */}
        <FilteredDataList
          categoryFilters={selectedCategories}
          typeFilters={selectedTypes}
        />
      </div>
    </DataProvider>
  );
};



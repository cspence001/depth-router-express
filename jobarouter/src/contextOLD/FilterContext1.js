import { useState } from 'react';
import { DataProvider1 } from '../context/DataContext1';
import FilteredDataList1 from '../context/FilteredDataList1';


export default function FilterContext1() {

    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (filter) => {
      // Toggle the filter's selection status
      setSelectedFilters(prevFilters => {
        if (prevFilters.includes(filter)) {
          return prevFilters.filter(f => f !== filter);
        } else {
          return [...prevFilters, filter];
        }
      });
    };
  
  return (
    <div className="context">

<DataProvider1>
    <h1>Filtered Data by Category Only</h1>
    <p>Uses IndexedDB (not localForage) for db creation, addition, retrieval in context/DataContext1, FilteredDataList1 components.</p>
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedFilters.includes('Category A')}
            onChange={() => handleFilterChange('Category A')}
          />
          Category A
        </label>

        <label>
          <input
            type="checkbox"
            checked={selectedFilters.includes('Category B')}
            onChange={() => handleFilterChange('Category B')}
          />
          Category B
        </label>
        {/* Add more checkboxes for other categories as needed */}
      </div>
      <FilteredDataList1 categoryFilters={selectedFilters} />
    </DataProvider1>
    </div>
  )
}
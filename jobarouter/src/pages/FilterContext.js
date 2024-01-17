import { useState } from 'react';
import { DataProvider } from '../context/DataContext';
import FilteredDataList from '../context/FilteredDataList';


export default function FilterContext() {

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

      <DataProvider>
      {/* <h1>All Data</h1>
      <FilteredDataList /> */}

      {/* <h1>Filtered Data (Category A)</h1>
      <FilteredDataList categoryFilter="Category A" />
      </DataProvider> */}
    <h1>Filtered Data</h1>
    <p>Uses IndexedDB (not localForage) for db creation, addition, retrieval in context/DataContext, FilteredDataList components.</p>
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
      <FilteredDataList categoryFilters={selectedFilters} />
    </DataProvider>

      

    </div>
  )
}
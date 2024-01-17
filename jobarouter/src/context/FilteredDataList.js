// FilteredDataList.js
import { React, useState, useEffect, useCallback } from 'react';
import { useData } from './DataContext';

const FilteredDataList = ({ categoryFilters = [] }) => {
//   const { data } = useData();
//   const filteredData = data.filter(item => {
//     // Apply optional filters based on variables (e.g., categoryFilter)
//     if (categoryFilter && item.category !== categoryFilter) {
//       return false;
//     }
//     // Add more filters as needed
//     return true;
//   });
// const filteredData = data.filter(item => {
//     // Check if the item's category is included in the selected filters
//     return categoryFilters.length === 0 || categoryFilters.includes(item.category);
//   });
  // Render null if no category filters are selected
//   if (categoryFilters.length === 0) {
//     return null;
//   }

//   const filteredData = data.filter(item => {
//     // Check if the item's category is included in the selected filters
//     return categoryFilters.includes(item.category);
//   });
const { fetchDataByCategory, addDataToIndexedDB } = useData();
const [filteredData, setFilteredData] = useState([]);

const fetchFilteredData = useCallback(async () => {
    try {
      if (categoryFilters.length === 0) {
        // Handle the case where no category is selected (show all data)
        const allData = await fetchDataByCategory();
        setFilteredData(allData);
      } else {
        // Fetch data for each selected category and combine the results
        const promises = categoryFilters.map(category => fetchDataByCategory(category));
        const filteredDataArrays = await Promise.all(promises);

        // Combine arrays and remove duplicates
        const combinedFilteredData = Array.from(new Set(filteredDataArrays.flat()));

        setFilteredData(combinedFilteredData);
      }
    } catch (error) {
      console.error('Error fetching and filtering data:', error);
      setFilteredData([]);
    }
  }, [categoryFilters, fetchDataByCategory]);

  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  const handleAddData = () => {
    // Example data structure
    const newData = [
        { id: 1, name: 'Item 1', category: 'Category A' },
        { id: 2, name: 'Item 2', category: 'Category B' },
        { id: 3, name: 'Item 3', category: 'Category A' },
        { id: 4, name: 'Item 4', category: 'Category A' },
        { id: 5, name: 'Item 5', category: 'Category B' },
    ];
    // Add new data to IndexedDB
    newData.forEach(item => addDataToIndexedDB(item));
    // After adding data, refetch and filter data based on the selected categories
    fetchFilteredData();
  };

  return (
    <div>
      <button onClick={handleAddData}>Add Data</button>
      {categoryFilters.length > 0 && (
        <ul>
          {filteredData.map(item => (
            <li key={item.id}>{item.name} - {item.category}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredDataList;

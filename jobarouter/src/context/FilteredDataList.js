// FilteredDataList.js
import React, { useState, useEffect, useCallback } from 'react';
import { useData } from './DataContext';

const FilteredDataList = ({ categoryFilters = [], typeFilters = [] }) => {
  const { fetchDataByCategoryAndType, addDataToIndexedDB } = useData();
  const [filteredData, setFilteredData] = useState([]);

  //Debugging repeated renders/mounts on initial page load
  useEffect(() => {
    console.log('FilteredDataList mounted/rendered');
  }, []); // Empty dependency array to run once on mount

  const fetchFilteredData = useCallback(async () => {
    try {
      console.log('Fetching data with filters:', categoryFilters, typeFilters);

      const result = await fetchDataByCategoryAndType(categoryFilters, typeFilters);
      console.log('Fetched Data:', result);

      setFilteredData(result);
    } catch (error) {
      console.error('Error fetching and filtering data:', error);
      setFilteredData([]);
    }
  }, [categoryFilters, typeFilters, fetchDataByCategoryAndType]);

  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  const handleAddData = async () => {
    // Example data structure
    const newData = [
      { id: 1, name: 'Item 1', category: 'Category A', type: 'AB' },
      { id: 2, name: 'Item 2', category: 'Category B', type: 'BC' },
      { id: 3, name: 'Item 3', category: 'Category A', type: 'BC' },
      { id: 4, name: 'Item 4', category: 'Category C', type: 'AB' },
      { id: 5, name: 'Item 5', category: 'Category C', type: 'CD' },
      { id: 6, name: 'Item 6', category: 'Category D', type: 'CD' },
      { id: 7, name: 'Item 7', category: 'Category A', type: 'CD' },
      { id: 8, name: 'Item 8', category: 'Category B', type: 'AB' },
    ];

    // Add new data to IndexedDB
    await Promise.all(newData.map(item => addDataToIndexedDB(item)));

    // After adding data, refetch and filter data based on the selected categories and types
    fetchFilteredData();
  };

  return (
    <div>
      <button onClick={handleAddData}>Add Data</button>
      {categoryFilters.length > 0 || typeFilters.length > 0 ? (
        <ul>
          {filteredData.map(item => (
            <li key={item.id}>{item.name} - {item.category} - {item.type}</li>
          ))}
        </ul>
      ) : (
        <p>No filters selected. Please select category and/or type.</p>
      )}
    </div>
  );
};

export default FilteredDataList;


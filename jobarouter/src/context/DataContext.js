// DataContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromIndexedDB = async () => {
      try {
        const db = await openDatabase();
        const transaction = db.transaction(['yourObjectStore'], 'readonly');
        const objectStore = transaction.objectStore('yourObjectStore');
        const request = objectStore.getAll();

        request.onsuccess = function (event) {
          const result = event.target.result;
          setData(result || []);
        };
      } catch (error) {
        console.error('Error fetching data from IndexedDB:', error);
      }
    };

    fetchDataFromIndexedDB();
  }, []); // Run once on component mount

  const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('yourDatabaseName', 1);

      request.onupgradeneeded = function (event) {
        const db = event.target.result;

        // Create an object store with an index
        const objectStore = db.createObjectStore('yourObjectStore', { keyPath: 'id' });
        objectStore.createIndex('category', 'category', { unique: false });
        objectStore.createIndex('type', 'type', { unique: false });

        objectStore.transaction.oncomplete = function () {
          resolve(db);
        };
      };

      request.onsuccess = function (event) {
        const db = event.target.result;
        resolve(db);
      };

      request.onerror = function (event) {
        reject(event.target.error);
      };
    });
  };
  
  const addDataToIndexedDB = async (newData) => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(['yourObjectStore'], 'readwrite');
      const objectStore = transaction.objectStore('yourObjectStore');

      const request = objectStore.add(newData);

      request.onsuccess = function () {
        console.log('Data added to IndexedDB:', newData);
        setData(prevData => [...prevData, newData]);
      };

      request.onerror = function (event) {
        console.error('Error adding data to IndexedDB:', event.target.error);
      };
    } catch (error) {
      console.error('Error opening IndexedDB for adding data:', error);
    }
  };

  const fetchDataByCategoryAndType = async (categoryFilters, typeFilters) => {
    return new Promise((resolve, reject) => {
      try {
        openDatabase().then(db => {
          const transaction = db.transaction(['yourObjectStore'], 'readonly');
          const objectStore = transaction.objectStore('yourObjectStore');
          const indexCategory = objectStore.index('category');
          const indexType = objectStore.index('type');

          let request;
          let filteredData = [];
  
          if (categoryFilters.length > 0 && typeFilters.length > 0) {
            // Fetch data by both category and type
            const categoryRange = IDBKeyRange.bound(categoryFilters[0], categoryFilters[categoryFilters.length - 1]);
            const typeRange = IDBKeyRange.bound(typeFilters[0], typeFilters[typeFilters.length - 1]);
  
            // Combine the ranges for both category and type
            const combinedRange = combineRanges(categoryRange, typeRange);

            request = indexCategory.openCursor(combinedRange);
            request.onsuccess = function (event) {
              const cursor = event.target.result;
              if (cursor) {
                if (typeFilters.includes(cursor.value.type)) {
                  filteredData.push(cursor.value);
                }
                cursor.continue();
              } else {
                resolve(filteredData);
              }
            };
          } else if (categoryFilters.length > 0) {
            // Fetch data by category only
            const categoryRange = IDBKeyRange.bound(categoryFilters[0], categoryFilters[categoryFilters.length - 1]);
  
            request = indexCategory.openCursor(categoryRange);
            request.onsuccess = function (event) {
              const cursor = event.target.result;
              if (cursor) {
                filteredData.push(cursor.value);
                cursor.continue();
              } else {
                resolve(filteredData);
              }
            };
          } else if (typeFilters.length > 0) {
            // Fetch data by type only
            const typeRange = IDBKeyRange.bound(typeFilters[0], typeFilters[typeFilters.length - 1]);
  
            request = indexType.openCursor(typeRange);
            request.onsuccess = function (event) {
              const cursor = event.target.result;
              if (cursor) {
                filteredData.push(cursor.value);
                cursor.continue();
              } else {
                resolve(filteredData);
              }
            };
          } else {
            // Fetch all data if neither category nor type is specified
            request = objectStore.openCursor();
            request.onsuccess = function (event) {
              const cursor = event.target.result;
              if (cursor) {
                filteredData.push(cursor.value);
                cursor.continue();
              } else {
                resolve(filteredData);
              }
            };
          }
        }).catch((error) => {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  const combineRanges = (range1, range2) => {
    // Combine two IDBKeyRanges into a single range
    const lower = range1.lower < range2.lower ? range1.lower : range2.lower;
    const upper = range1.upper > range2.upper ? range1.upper : range2.upper;
  
    // Ensure that the lower key is less than or equal to the upper key
    return lower <= upper ? IDBKeyRange.bound(lower, upper) : null;
  };
  


  return (
    <DataContext.Provider value={{ data, setData, addDataToIndexedDB, fetchDataByCategoryAndType }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useData };

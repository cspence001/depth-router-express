// DataContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([
    // { id: 1, name: 'Item 1', category: 'Category A' },
    // { id: 2, name: 'Item 2', category: 'Category B' },
    // { id: 3, name: 'Item 3', category: 'Category A' },
    // Add more data as needed
  ]);
//newest
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
        const objectStore = db.createObjectStore('yourObjectStore', { keyPath: 'id' });
        objectStore.createIndex('category', 'category', { unique: false });


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

  const fetchDataByCategory = async (category) => {
    return new Promise((resolve, reject) => {
        try {
          openDatabase().then(db => {
            const transaction = db.transaction(['yourObjectStore'], 'readonly');
            const objectStore = transaction.objectStore('yourObjectStore');
            const index = objectStore.index('category');
  
            if (category !== undefined) {
              const range = IDBKeyRange.only(category);
              const request = index.openCursor(range);
  
              const filteredData = [];
  
              request.onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                  filteredData.push(cursor.value);
                  cursor.continue();
                } else {
                  resolve(filteredData);
                }
              };
  
              request.onerror = function (event) {
                reject(event.target.error);
              };
            } else {
              // Handle the case where category is undefined (fetch all data)
              const request = objectStore.getAll();
  
              request.onsuccess = function (event) {
                const result = event.target.result;
                resolve(result || []);
              };
  
              request.onerror = function (event) {
                reject(event.target.error);
              };
            }
          }).catch(error => {
            reject(error);
          });
        } catch (error) {
          reject(error);
        }
      });
    };
  

  return (
    <DataContext.Provider value={{ data, setData, addDataToIndexedDB, fetchDataByCategory }}>
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

import workerScript from "./pako.worker"
import * as localforage from "localforage"
import "localforage-getitems";
import "localforage-setitems";
import { extendPrototype as extendPrototypeSet } from "localforage-setitems";
import { extendPrototype as extendPrototypeGet } from "localforage-getitems";
extendPrototypeSet(localforage);
extendPrototypeGet(localforage);



// Configure localForage at the beginning
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'myApp',
  version: 1.0,
  storeName: 'myStore',
});

const FetchAndCompressButton = ({ label, dataKey, filePath }) => {
  const fetchDataAndCompress = async () => {
    try {
      const res = await fetch(filePath);

      if (!res.ok) {
        throw Error('Could not fetch the data');
      }

      // Fetch JSON data
      const jsonObjects = await res.json();

      // Compress data and store it in localforage
      const worker = new Worker(workerScript);
      worker.onmessage = (event) => {
        const compressedData = event.data;
        localforage.setItem(`${dataKey}_compressed`, compressedData);
        //localforage.setItem(dataKey, jsonObjects)
        console.log('Data fetched and compressed successfully:', compressedData);
      };
      worker.postMessage({ action: 'compress', data: jsonObjects });
    } catch (error) {
      console.error('Error processing data:', error);
      // Handle error as needed
    }
  };

  return (
    <button onClick={fetchDataAndCompress}>
        {label}
    </button>
  );
};

export default FetchAndCompressButton;

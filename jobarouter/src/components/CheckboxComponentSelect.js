import { useState } from "react";
import workerScript from "./pako.worker"
import Checkbox from "./CheckboxComponent";
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


const CheckboxSelect = ({ label, checked, dataKey, ...props }) => {
    const [checkedOne, setCheckedOne] = useState(false);
    // const [checkedTwo, setCheckedTwo] = useState(false);
    
    const handleDecompression = () => {
        localforage.getItem(`${dataKey}_compressed`).then((value) => {
            const worker = new Worker(workerScript);
            worker.onmessage = (event) => {
              const decompressedData = event.data;
              console.log(decompressedData);
            };
            worker.postMessage({ action: "decompress", data: value });
          });
        };

    const handleChangeOne = () => {
      setCheckedOne(!checkedOne);
      if (!checkedOne)
      handleDecompression()
    };
  
    // const handleChangeTwo = () => {
    //   setCheckedTwo(!checkedTwo);
    //   if (!checkedTwo) {
    //     handleDecompression();
    //   }
    // };
      
    return (
      <div className="checkbox-wrapper">
      <Checkbox
        label={label}
        value={checkedOne}
        onChange={handleChangeOne}
      />
      {/* <Checkbox
        label="Value 2"
        value={checkedTwo}
        onChange={handleChangeTwo}
      /> */}
      </div>
    );
  };
  export default CheckboxSelect;
import { useLoaderData, Link } from "react-router-dom"
// import { memoryStorageDriver } from "localforage-memoryStorageDriver"
// import DataComponent from "../../components/DataComponent";
import * as localforage from "localforage"
import "localforage-getitems";
import "localforage-setitems";
import { extendPrototype as extendPrototypeSet } from "localforage-setitems";
import { extendPrototype as extendPrototypeGet } from "localforage-getitems";
import CheckboxSelect from "../../components/CheckboxComponentSelect";
import FetchAndCompressButton from "../../components/handleCompression";
extendPrototypeSet(localforage);
extendPrototypeGet(localforage);


// Configure localForage at the beginning
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'myApp',
  version: 1.0,
  storeName: 'myStore',
});


export default function Careers() {

  const careersData = useLoaderData()
  // const keys = Object.keys(careersData)
  // const values = Object.values(careersData)
  // const uniquekeyvals = Object.keys(careersData[0])

  // console.log(careersData); 
  // console.log(keys);
  // console.log(values); 
  // console.log(uniquekeyvals);

  //individual k,v storage
  var careersStoreTitle = localforage.createInstance({
    name: "dbCareer",
    storeName: 'careersStoreTitle',
  });
  var careersStoreSalary = localforage.createInstance({
    name: "dbCareer",
    storeName: 'careersStoreSalary',
  });
  var careersStoreLocation = localforage.createInstance({
    name: "dbCareer",
    storeName: 'careersStoreLocation',
  });
  var promises = careersData.map(function(x) {
    return careersStoreTitle.setItem(x.id.toString(), x.title);
  });
  var promises2 = careersData.map(function(x) {
    return careersStoreSalary.setItem(x.id.toString(), x.salary);
  });
  var promises3 = careersData.map(function(x) {
    return careersStoreLocation.setItem(x.id.toString(), x.location);
  });

  Promise.all(promises, promises2, promises3);

  //full array
  var careersStoreFull = localforage.createInstance({
    name: "dbCareer",
    storeName: 'careersStoreFull',
  });
  careersStoreFull.setItem("jobData", careersData)

  //full array, parsed by key
  var careersStoreFullParsed = localforage.createInstance({
    name: "dbCareer",
    storeName: 'careersStoreFullParsed',
  });

  //fill DB
  function promisesParsed(){careersData.map(function(x) {
    return careersStoreFullParsed.setItem(x.id.toString(), x)
  });
};

  //test retrieval
  function testRetrieve(){careersStoreFullParsed.getItem('2').then(function(value) {
    console.log(value)
  }).catch(function(err) {
      console.log(err);
  });
}
  //test remove
  function testRemove(){careersStoreFullParsed.removeItem('3').then(function() {
    console.log('Key is cleared!');
  }).catch(function(err) {
      console.log(err);
  });
}
  //test keys
  function testKeys(){ careersStoreFullParsed.keys().then(function(keys) {
    console.log(keys);
  }).catch(function(err) {
      console.log(err);
  });
};
  //test clear
  function clearAppDB(){localforage.clear().then(function() {
    // Run this code once the database has been entirely deleted.
    console.log('Database is now empty.');
  }).catch(function(err) {
    console.log(err);
  });
};
  function clearCareerDB(){careersStoreFullParsed.clear().then(function() {
    console.log('Database is now empty.');
  }).catch(function(err) {
    console.log(err);
  });
};

//test drops
function testDropSpecificStore(){
  localforage.dropInstance({
  name: "dbCareer",
  storeName: "careersStoreTitle"
}).then(function() {
  console.log('Dropped CareersStoreTitle')
});
}

function testDropSpecificDB(){
localforage.dropInstance({
  name: "dbCareer"
}).then(function() {
  console.log('Dropped dbCareer database')
});
}

function testIterate(){
  careersStoreFullParsed.iterate(function(value, key, iterationNumber) {
    // Resulting key/value pair -- this callback
    // will be executed for every item in the
    // database.
    console.log([key, value]);
}).then(function() {
    console.log('Iteration has completed');
}).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
});
}


// function testDeflate(){
//   const worker = new Worker(workerScript); 
//   worker.onmessage = (event) => {
//     const compressedData = event.data;
//     localforage.setItem('careersData', compressedData);
//   };
//   worker.postMessage({ action: 'compress', data: careersData });
// }

// function testInflate(){
//   localforage.getItem('careersData').then(function(value){
//   const worker = new Worker(workerScript); 
//   worker.onmessage = (event) => {
//     const decompressedData = event.data;
//     console.log(decompressedData)
//   };
//     worker.postMessage({ action: 'decompress', data: value });
//   })
// }

// function testInflateComp(){
//   fetchDataBasedOnInput('careersData')
// }

// function testClear(){
//   const dataComponentInstance = new DataComponent();
//   // Example: Clear data when deselected
//   dataComponentInstance.clearData();
// }


return (
  <div className="careers">
    { careersData.map(career => (
      <Link to={ career.id.toString()} key={career.id}>
        <p>{career.title}</p>
        <p>Based in { career.location }</p>
        </Link>
    ) )}
    <button onClick={() => promisesParsed()}>CreateParseDB</button>
    <button onClick={() => testRetrieve()}>Retrieve</button>
    <button onClick={() => testRemove()}>Remove</button>
    <button onClick={() => testKeys()}>Keys</button>
    <button onClick={() => clearAppDB()}>ClearAppDB</button>
    <button onClick={() => clearCareerDB()}>ClearCareerDB</button>
    <button onClick={() => testDropSpecificStore()}>DropCareerStoreTitle</button>
    <button onClick={() => testDropSpecificDB()}>DropCareerDB</button>
    <button onClick={() => testIterate()}>IterateParseDB</button>
    {/* <button onClick={() => testDeflate()}>DeflateAppDB</button> */}
    {/* <button onClick={() => testInflate()}>InflateAppDB</button> */}
    {/* <button onClick={() => testInflateComp()}>InflateCompAppDB</button> */}
    {/* <button onClick={() => testClear()}>ClearAppDB</button> */}
    <FetchAndCompressButton label={'fetchCareers'} dataKey={'careersData'} filePath={'http://localhost:5000/careers'} />
    <FetchAndCompressButton label={'fetchState'} dataKey={'stateData'} filePath={'http://localhost:5000/state'} />
    <CheckboxSelect label="Value 1" dataKey="careersData" />
    <CheckboxSelect label="Value 2" dataKey="stateData" />
  </div>
  )
};


export const careersDataLoader = async () => {
  const filepath = 'http://localhost:5000/careers';
  const res = await fetch(filepath);

  if (!res.ok) {
    throw Error('Could not fetch the careers');
  }

  try {
    // Fetch JSON data
    let jsonObjects = await res.json();

    return jsonObjects;
  } catch (error) {
    console.error('Error processing data:', error);
    throw Error('Error processing data');
  }
};

import { useLoaderData, Link } from "react-router-dom"
// import { SetItemStore } from "../../components/Forager"
// import { memoryStorageDriver } from "localforage-memoryStorageDriver"
// import { setup } from 'axios-cache-adapter'
import * as localforage from "localforage"
import "localforage-getitems";
import "localforage-setitems";
import { extendPrototype as extendPrototypeSet } from "localforage-setitems";
import { extendPrototype as extendPrototypeGet } from "localforage-getitems";
extendPrototypeSet(localforage);
extendPrototypeGet(localforage);

localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'myApp', // database
  version     : 1.0,
  // size        : 4980736, // Size of database, in bytes. WebSQL-only for now. 
  // storeName   : 'careersStore', // Should be alphanumeric, with underscores. // name of key-value table in database
  description : 'some description'
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

return (
  <div className="careers">
    { careersData.map(career => (
      <Link to={ career.id.toString()} key={career.id}>
        <p>{career.title}</p>
        <p>Based in { career.location }</p>
        </Link>
    ) )}
    <button onClick={() => promisesParsed()}>Create Parse DB</button>
    <button onClick={() => testRetrieve()}>Retrieve</button>
    <button onClick={() => testRemove()}>Remove</button>
    <button onClick={() => testKeys()}>Keys</button>
  </div>
  )
};

// loader function
export const careersDataLoader = async () => {
    // const api = await configureAxios();
    const filepath = 'http://localhost:5000/careers'
    const res = await fetch(filepath)
    
    if (!res.ok){
      throw Error('Could not fetch the careers')
    }
    let jsonObjects = await res.json();

    localforage.setDriver([localforage.INDEXEDDB]);
    localforage.setItem(filepath,jsonObjects); //sets filepath as key (db: myApp, table: keyvaluepairs, "key": "http://localhost:5000/careers")

    let forceDB = localforage.getItem(filepath)
    return forceDB;
  
}



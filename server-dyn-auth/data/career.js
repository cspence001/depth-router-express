const { NotFoundError } = require('../util/errors');
const { readData } = require('./util');

async function getAll() {
  const storedData = await readData();
  const storedArray = storedData.careers;
  console.log(storedArray);
  if (!storedArray) {
    throw new NotFoundError('Could not find any events.');
  }
  return storedArray;
}

async function get(id) {
  const storedData = await readData();
  const storedArray = storedData.careers;
  if (!storedArray || storedArray.length === 0) {
    throw new NotFoundError('Could not find any events.');
  }
  // const career = storedData.careers.filter(({id}) => id  === id);
  const career = storedArray.filter(function(item) {
    return item.id == id
  });
  if (!career) {
    throw new NotFoundError('Could not find event for id ' + id);
  }
  return career[0];
}


exports.getAll = getAll;
exports.get = get;
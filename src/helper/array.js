const removeDuplicates = (array, key) => {
  if (!(array instanceof Array) || (key && typeof key !== 'string')) {
    return false;
  }

  if (key && typeof key === 'string') {
    return array.filter((obj, index, arr) =>
      arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index);
  }
  return array.filter((item, index, arr) => arr.indexOf(item) === index);
};

export default removeDuplicates;

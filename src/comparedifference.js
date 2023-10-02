import _ from 'lodash';

const getSortedKeys = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys;
};

const compareDifference = (data1, data2) => {
  const sortKeys = getSortedKeys(data1, data2);
  const result = sortKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { status: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { status: 'deleted', key, value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { status: 'nested', key, value: compareDifference(data1[key], data2[key]) };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { status: 'unchanged', key, value: data1[key] };
    }
    return {
      status: 'changed', key, value1: data1[key], value2: data2[key],
    };
  });
  return result;
};

export default compareDifference;

import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parse.js';

const readFile = (filepath) => {
  const fullPath = path.resolve('__fixtures__', filepath);
  const data = fs.readFileSync(fullPath, 'utf-8').toString();
  return data;
};

const getFormat = (filepath) => path.extname(filepath);

const getSortedKeys = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const unionKeys = _.union(keys1, keys2);
  const sortKeys = _.sortBy(unionKeys);
  return sortKeys;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const dataParse1 = parse(data1, getFormat(filepath1));
  const dataParse2 = parse(data2, getFormat(filepath2));

  const sortKeys = getSortedKeys(dataParse1, dataParse2);

  const result = sortKeys.map((key) => {
    if (!data1.includes(key)) {
      return `  + ${key}: ${dataParse2[key]}`;
    }
    if (!data2.includes(key)) {
      return `  - ${key}: ${dataParse1[key]}`;
    }
    if (dataParse1[key] !== dataParse2[key]) {
      return `  - ${key}: ${dataParse1[key]}\n  + ${key}: ${dataParse2[key]}`;
    }
    return `    ${key}: ${dataParse1[key]}`;
  });
  return `{\n${result.join('\n')}\n}`;
};
export default genDiff;
